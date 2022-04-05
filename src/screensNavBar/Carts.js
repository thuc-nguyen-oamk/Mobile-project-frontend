import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import React from 'react';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartsItem from "../components/CartsItem";
import { useNavigation } from '@react-navigation/native';
import jwt_decode from "jwt-decode";
import axios from 'react-native-axios';

const Carts = ({isLoggedIn}) => {
  const navigation = useNavigation()
  const [cart, setCart] = useState([])
  const [token, setToken] = useState("")
  
  const path = ""
  useEffect(() => {
    const readStorage = async () => {
      try {
        const cartString = await AsyncStorage.getItem('cart')
        let _cart = JSON.parse(cartString)
        // console.log('read x', _cart, typeof _cart);
        const _token = await AsyncStorage.getItem('token')
        setToken(_token)
        if (!_cart) {_cart = []}
        setCart(_cart)
      } catch (e) {
        console.error(e)
      }
    }
    readStorage()
  }, [path])
  

  const deleteItem = async (id, detail_id) => {
    try {
      let currentIndex = cart.findIndex(function (p, i) {
        return (p.product_id === id && p.product_detail_id === detail_id)
      })
      cart.splice(currentIndex, 1)
      await AsyncStorage.setItem('cart', JSON.stringify(cart))
      setCart([...cart])
    } catch (e) {
      console.error(e)
    }
  };

  const downQty = async (id, detail_id) => {
    try {
      // let currentIndex = cart.findIndex((p, i) => {
      //   (p.product_id === id && p.product_detail_id === detail_id)
      // });
      let currentIndex = cart.findIndex(function (p, i) {
        return (p.product_id === id && p.product_detail_id === detail_id)
      });
      cart[currentIndex].product_qty -= (cart[currentIndex].product_qty === 0) ? 0 : 1
      await AsyncStorage.setItem('cart', JSON.stringify(cart))
      setCart([...cart])
    } catch (e) {
      console.error(e)
    }
  };

  const upQty = async (id, detail_id) => {
    try {
      let currentIndex = cart.findIndex(function (p, i) {
        return (p.product_id === id && p.product_detail_id === detail_id)
      })
      cart[currentIndex].product_qty += 1
      await AsyncStorage.setItem('cart', JSON.stringify(cart))
      setCart([...cart])
    } catch (e) {
      console.error(e)
    }
  };

  const getTotalPrice = () => {
    if (cart.length === 0) return 0
    if (cart.length === 1) return cart[0].product_price_discounted * cart[0].product_qty
    const totalObj = cart.reduce((prev, curr) => ({
      price: curr.product_price_discounted * curr.product_qty + prev.product_price_discounted * prev.product_qty,
      qty: 1,
    }));
    return totalObj.price
  };

  const checkOut = () => {
    let order_details = cart.map(function (item) {
      return ({
        product_id: item.product_id,
        product_detail_id: item.product_detail_id,
        product_name: item.product_name,
        product_price: item.product_price_discounted,
        product_amount: item.product_qty,
      })
    })

    let decode = jwt_decode(token)

    let order = {
      customer_id: decode.customer_id,
      order_address: decode.customer_address,
      voucher_id: null,
      order_total: getTotalPrice(),
      order_details: order_details,
    }
    console.log(order)

    axios
      .post(`${axios.defaults.baseUrl}/order/add`, order)
      .then(res => {
        if (res.status === 200){
          alert("Add new order succeeded")
        } else {
          alert("Fail due to something")
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <View>
      {!isLoggedIn &&
        <View style={styles.buttonContainer}>
          <Text style={[styles.text, styles.alert]}>You need login to view your card</Text>
          <Button
            title="Click here to Login"
            color="#fb70ff"
            onPress={() => navigation.navigate('User')}
          />
        </View>
      }

      { isLoggedIn && 
        <View>
          <FlatList
            data={cart}
            renderItem={({ item }) => 
              <View style={styles.wrap}>
                <CartsItem item={item} 
                  deleteItem={() => deleteItem(item.product_id, item.product_detail_id)}
                  downQty={() => downQty(item.product_id, item.product_detail_id)}
                  upQty={() => upQty(item.product_id, item.product_detail_id)}
                />
              </View>
            }
            keyExtractor={item => `${item.product_id} and ${item.product_detail_id}`}
          />
          <View style={styles.bottom}>
            <Text style={styles.text}>Total: {getTotalPrice()}$</Text>
            <Button title="Checkout" color="#f48cff" onPress={checkOut}/>
          </View>
        </View>
      }
    </View>
  )
}

export default Carts

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
})