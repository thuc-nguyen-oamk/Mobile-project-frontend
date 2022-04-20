import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';

const OrderHistory = props => {
  const [listOrders, setListOrders] = useState([]);

  const path = '';
  useEffect(() => {
    const readStorage = async () => {
      try {
        const _token = await AsyncStorage.getItem('token');
        const _decode = jwt_decode(_token);

        const fetchOne = async x => {
          axios
            .get(
              `${axios.defaults.baseUrl}/order/customer/${_decode.customer_id}`,
              {
                headers: {Authorization: `Bearer ${_token}`},
              },
            )
            .then(res => {
              let _listOrders = res.data.orderList;
              setListOrders(_listOrders);
            })
            .catch(err => console.error(err));
        };
        fetchOne(path);
      } catch (e) {
        console.error(e);
      }
    };
    readStorage();
  }, [path]);

  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  };

  return (
    <View>
      <View style={styles.title}>
        <Text style={[styles.text, styles.titletext]}>Order history</Text>
      </View>
      {listOrders == [] ? (
        <></>
      ) : (
        <FlatList
          data={listOrders}
          renderItem={({item}) => (
            <View style = {styles.container}>
              <View style = {styles.wrapper}>
                <Text style={[styles.text, styles.status]}>Order ID: {item.order_id} | </Text>
                <Text style={styles.status}>Status: {item.order_status}</Text>
              </View>

              {item.order_detail.map(itemChild => (
                <View style={[styles.wrapper, styles.child]} key={itemChild.order_detail_id}>
                  <Text style={styles.text}>- {itemChild.product_name} -- </Text>
                  <Text style={styles.text}>{itemChild.product_color}</Text>
                </View>
              ))}
            </View>
          )}
          ItemSeparatorComponent={ItemDivider}
          keyExtractor={item => item.order_id}
        />
      )}
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container:{
   flex:1,
  },
  wrapper: {
    flexDirection: 'row',
    paddingLeft: 8,
    paddingTop: 8
  },
  text: {
    color: 'black',
    fontSize: 14,
    //lineHeight: 10,
  },
  status: {
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  title: {
    alignItems: "center"
  },
  titletext: {
    fontWeight: 'bold',
    fontSize: 22
  },
  id: {
    fontWeight: 'bold',
  },
  child: {
    paddingLeft: 26
  }
});
