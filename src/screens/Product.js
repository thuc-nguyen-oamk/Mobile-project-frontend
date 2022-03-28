import {StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import { useState, useEffect } from "react";

const Product = (props) => {
  let product = props.route.params.product

  const [productTypes, setProductTypes] = useState([
    { product_detail_id: 1, product_color: "blue", product_price: 11, product_price_discounted: 1, product_stock: 100, product_id: 1, product_images: "https://i.imgur.com/s960jiH.png"},
    { product_detail_id: 2, product_color: "red", product_price: 22, product_price_discounted: 2, product_stock: 200, product_id: 1, product_images: "https://i.imgur.com/cSZ2XJw.jpg"}
  ])

  const [displayStock, setDisplayStock] = useState([productTypes[0].product_stock])
  const [displayPrice, setDisplayPrice] = useState([productTypes[0].product_price])
  const [displayPriceDiscounted, setDisplayPriceDiscounted] = useState([productTypes[0].product_price_discounted])
  const [displayImage, setDisplayImage] = useState([productTypes[0].product_images])

  function onPressTypeColor(item) {
    setDisplayStock(item.product_stock)
    setDisplayPrice(item.product_price)
    setDisplayPriceDiscounted(item.product_price_discounted)
    setDisplayImage(item.product_images)
  }

  const linkImg = `${displayImage}`

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
          {displayStock==0 ? "" : displayStock+"pcs"}
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