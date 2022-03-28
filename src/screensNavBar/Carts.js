import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React from 'react';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartsItem from "../components/CartsItem"

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

  return (
    <View>
      <FlatList
        data={cart}
        renderItem={({ item }) => 
          <View style={styles.wrap}>
            <CartsItem card={item}>
              <View style={styles.left}>
                <Image style={styles.img} source={{uri: item.product_images}} />
              </View>
              <View style={styles.right}>
                <Text style={[styles.text, styles.name]}>{item.product_name}</Text>
                <View style={styles.row}>
                  <View style={styles.rowLeft}>
                    <Text style={[styles.text, styles.price]}>{item.product_price}$</Text>
                    <Text style={[styles.text, styles.discounted]}>{item.product_price_discounted}$</Text>
                  </View>
                  <View style={styles.rowRight}>
                    <Text style={[styles.text, styles.type]}>{item.product_color}</Text>
                  </View>
                </View>
                <Text style={[styles.text, styles.qty]}>{item.product_qty}</Text>
              </View>
            </CartsItem>
          </View>
        }
        keyExtractor={item => `${item.product_id} and ${item.product_detail_id}`}
      />
    </View>
  )
}

export default Carts

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  img: {
    width: 100,
    height: 100,    
  },
  right: {
    flex: 1,
    padding: 8
  },
  row: {
    flexDirection: "row",
  },
  rowLeft: {
    flexDirection: "row",
  },
  rowRight: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
})