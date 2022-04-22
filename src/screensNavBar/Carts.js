import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import React from 'react';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartsItem from "../components/CartsItem";
import { useNavigation } from '@react-navigation/native';
import jwt_decode from "jwt-decode";
import axios from 'react-native-axios';

const Carts = ({isLoggedIn, qtyCart, setQtyCart, cart, setCart}) => {
  const navigation = useNavigation()
  const [token, setToken] = useState("")
  
  const path = ""
  useEffect(() => {
    const readStorage = async () => {
      try {
        const _token = await AsyncStorage.getItem('token')
        setToken(_token)
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
      qtyCart -=1
      await AsyncStorage.setItem('qtyCart', qtyCart.toString())
      setQtyCart(qtyCart)
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
      cart[currentIndex].product_qty -= (cart[currentIndex].product_qty === 1) ? 0 : 1
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
      order_detail: order_details,
    }
    // order = JSON.stringify(order) 
    // console.log(order)

    axios
      .post(`${axios.defaults.baseUrl}/order/add`, order,
        {
          headers: {"content-type": "application/json"},
        }
      )
      .then(res => {
        if (res.status === 200){
          alert("Add new order succeeded")
          const remove = async () => {
            try {
              await AsyncStorage.removeItem('cart')
              setCart([])  // if not, can't rerender !!!
              qtyCart = 0
              await AsyncStorage.setItem('qtyCart', qtyCart.toString())
              setQtyCart(qtyCart)
            } catch (e) {
              // remove error
            }
          };
          remove();

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
          <View style={styles.viewNote}>
            <Text style={[styles.text, styles.note]}>You need login to view your cart</Text>
          </View>
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
          <View style={styles.viewTotalPrice}>
            <Text style={[styles.text, styles.totalPrice]}>Total: </Text>
            <Text style={styles.getPrice}> {getTotalPrice()}$</Text>
          </View>
          <Button title="Checkout" color="#f48cff" onPress={checkOut}/>
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
  note: {
    fontWeight: 'bold',
  },
  viewNote: {
    alignItems: 'center',
    padding: 8,
  },
  wrap: {
    paddingRight: 4,
    paddingLeft: 4,
  },
  viewTotalPrice: {
    padding: 4,
    flexDirection: "row",
  },
  totalPrice: {
    fontWeight: 'bold',
  },
  getPrice: {
    color: 'red',
    fontWeight: 'bold',
  },
})