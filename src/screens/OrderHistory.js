import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "react-native-axios";

const OrderHistory = (props) => {
  const [listOrders, setListOrders] = useState([])
  
  const path = ""
  useEffect(() => {
    const readStorage = async () => {
      try {
        const _token = await AsyncStorage.getItem('token')
        const _decode = jwt_decode(_token)

        const fetchOne = async (x) => {
          axios
            .get(`${axios.defaults.baseUrl}/order/customer/${_decode.customer_id}`, {
              headers: {"Authorization": `Bearer ${_token}`},
            })
            .then((res) => {
              let _listOrders = res.data.orderList
              setListOrders(_listOrders)
            })
            .catch((err) => console.error(err))
        }
        fetchOne(path)

      } catch (e) {
        console.error(e)
      }
    }
    readStorage()
  }, [path])

  return (
    <View>
      <Text style={styles.text}>Order history</Text>
      {
        (listOrders == []) ? <></> :
        <FlatList
          data={listOrders}
          renderItem={({ item }) => 
            <View style={styles.wrap}>
              <Text style={styles.text}>{item.order_id}</Text>
              <Text style={styles.text}>{item.order_status}</Text>

              {item.order_detail.map((itemChild) => (
                <View style={styles.wrap} key={itemChild.order_detail_id}>
                  <Text style={styles.text}>{itemChild.product_name}</Text>
                  <Text style={styles.text}>{itemChild.product_color}</Text>
                </View>
              ))}

            </View>
          }
          keyExtractor={item => item.order_id}
        />
      }
    </View>
  )
}

export default OrderHistory

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
})