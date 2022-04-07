import {StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert, Button} from 'react-native';
import React from 'react';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "react-native-axios";

const Product = (props) => {
  let product = props.route.params.product
  let qtyCart = props.qtyCart
  let setQtyCart = props.setQtyCart

  const path = ""
  const [productTypes, setProductTypes] = useState([])
  const [displayStock, setDisplayStock] = useState([product.product_stock_total])
  const [displayPrice, setDisplayPrice] = useState([product.display_price])
  const [displayPriceDiscounted, setDisplayPriceDiscounted] = useState([product.display_price_discounted])  
  const [displayImage, setDisplayImage] = useState([product.display_image])
  const [choosenProduct, setChoosenProduct] = useState([]) 

  useEffect(() => {
    function fetchOne(x) {
      axios
        .get(`${axios.defaults.baseUrl}/products/${product.product_id}`)
        .then((res) => {
          let listProducts = res.data[0].details
          setProductTypes(listProducts)

          setDisplayStock(listProducts[0].product_stock)
          setDisplayPrice(listProducts[0].product_price)
          setDisplayPriceDiscounted(listProducts[0].product_price_discounted)
          setDisplayImage(listProducts[0].product_images.split(",")[0])
          setChoosenProduct(listProducts[0]) 
        })
        .catch((err) => console.error(err))
    }
    fetchOne(path)
  }, [path])

  const onPressTypeColor = (item) => {
    setDisplayStock(item.product_stock)
    setDisplayPrice(item.product_price)
    setDisplayPriceDiscounted(item.product_price_discounted)
    setDisplayImage(item.product_images.split(",")[0])
    setChoosenProduct(item)
  }
  
  const addToCart = async () => {
    if (choosenProduct.product_stock > 0) { 
      try {
        // await AsyncStorage.removeItem('cart')
        const cartString = await AsyncStorage.getItem('cart')
        let cart = JSON.parse(cartString)
        if (!cart) {cart = []}

        let indexCurrentProduct = cart.findIndex(function (p, i) {
          return (p.product_detail_id === choosenProduct.product_detail_id)
        });

        if (indexCurrentProduct === -1) {
          let currentProduct = {
            product_detail_id: choosenProduct.product_detail_id,
            product_id: product.product_id,
            product_name: product.product_name,
            product_price: choosenProduct.product_price, 
            product_price_discounted: choosenProduct.product_price_discounted,
            product_color: choosenProduct.product_color, 
            product_images: choosenProduct.product_images.split(",")[0], 
            product_qty: 1,
          } 
          cart.push(currentProduct)
          await AsyncStorage.setItem('cart', JSON.stringify(cart))

          qtyCart +=1
          setQtyCart(qtyCart)
        }
        else if (choosenProduct.product_stock > cart[indexCurrentProduct].product_qty) {
          cart[indexCurrentProduct].product_qty +=1
          await AsyncStorage.setItem('cart', JSON.stringify(cart))
        }
        else {
          alert("Sorry: your product in shopping-cart is larger than our stock")
          return
        }
        alert("Added to cart.")
      } catch (e) {
        console.error(e)
      }
    }
    else {
      alert("Sorry: out of stock")
    }
  }

  let linkImg = `${axios.defaults.baseUrl}/images/${displayImage}`

  return (
    <View style={styles.container} flexDirection="column">
        <Image style={styles.img} source={{uri: linkImg}} />
        <Text style={[styles.text, styles.name]}>{product.product_name}</Text>
        <Text style={[styles.text, styles.brand]}>{product.product_brand}</Text>

        <Text style={styles.chooseColor}>Choose color</Text>
        <View style={styles.listTypes}>
          <FlatList
            data={productTypes}
            numColumns={5}
            renderItem={({ item }) =>
              <TouchableOpacity activeOpacity={0.5}
                onPress={() => onPressTypeColor(item)}
              >
                <View style={styles.wrap}>
                  <Text style={[styles.text, styles.type]}>{item.product_color}</Text>
                </View>
              </TouchableOpacity>
            }
            keyExtractor={item => item}
          />  
          <Text style={[styles.text, styles.stock]}>
            {/* {displayStock==0 ? "" : displayStock+"pcs"} */}
            {displayStock+"pcs"}
          </Text>
        </View>
        
        <View style={styles.containerOneLine}>
          <Text style={[styles.text, styles.discounted]}>{displayPriceDiscounted} $</Text>
          <Text style={[styles.text, styles.price]}>{displayPrice} $</Text>
          <View style={styles.rightContainerOneLine}>
            {/* rating or brand*/}
          </View>
        </View>

        <Text style={[styles.text, styles.name]}>Description</Text>
        <Text style={[styles.text, styles.description]}>{product.product_description}</Text>
      <Button title="Add to Cart" color="#f48cff" onPress={addToCart}/>
    </View>
  )
}

export default Product

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20
  },
  text: {
    color: 'black',
  },
  img: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 28,
  },
  brand: {
    fontWeight: "bold",
    fontSize: 20,
  },
  containerOneLine: {
    flexDirection: "row",
    textAlign: "center",
  },
  price: {
    color: "gray",
    textDecorationLine: 'line-through',
    paddingLeft: 8,
  },
  discounted: {
    color: "red",
    fontWeight: "500",
  },
  chooseColor: {
    color: "blue",
    fontWeight: "bold",
    paddingTop: 8,
    paddingBottom: 8,
  },
  listTypes: {
    paddingBottom: 8
  },
  wrap: {
    paddingRight: 16
  },
  stock: {
    paddingTop: 8
  }
})