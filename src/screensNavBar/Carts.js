import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import React from 'react';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartsItem from "../components/CartsItem";

const Carts = () => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const readStorage = async () => {
      try {
        const cartString = await AsyncStorage.getItem('cart')
        let _cart = JSON.parse(cartString)
        // console.log('read x', _cart, typeof _cart);
        if (!_cart) {_cart = []}
        setCart(_cart)
      } catch (e) {
        console.error(e)
      }
    }
    readStorage()
  }, [cart])

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
    console.log(cart)
  }

  return (
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
  )
}

export default Carts

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
})