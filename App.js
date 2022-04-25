import React from 'react';
import { StyleSheet, Text } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./src/screensNavBar/Home";
import Categories from "./src/screensNavBar/Categories";
import Notifications from "./src/screensNavBar/Notifications";
import Carts from "./src/screensNavBar/Carts";
import User from "./src/screensNavBar/User";

import Category from "./src/screens/Category";
import Product from './src/screens/Product';
import SignUp from './src/screens/SignUp';
import Chat from "./src/screensNavBar/Chat";

import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'react-native-axios';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

const API_ADDRESS = "https://api.uniproject.xyz/"
const SOCKETIO_PATH = "/eshopmb/socket.io/"

const Stack = createNativeStackNavigator()
export default function App() {
  axios.defaults.baseUrl = "https://api.uniproject.xyz/eshopmb/"

  const path = ""
  const [products, setProducts] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [qtyCart, setQtyCart] = useState(0)
  const [cart, setCart] = useState([])
  const [newMessageBadge, setNewMessageBadge] = useState(null)

  useEffect(() => {
    function fetchOne(x) {
      axios
        .get(`${axios.defaults.baseUrl}/products/`)
        .then((res) => {
          setProducts(res.data)
        })
        .catch((err) => console.error(err))
    }
    fetchOne(path)

    const readStorage = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        const qtyCartString = await AsyncStorage.getItem('qtyCart')
        const cartString = await AsyncStorage.getItem('cart')
        
        if (token) { setIsLoggedIn(true)}
        if (qtyCartString) {
          const _qtyCart = parseInt(qtyCartString)
          setQtyCart(_qtyCart)
        }
        if (cartString) {
          const _cart = JSON.parse(cartString)
          setCart(_cart)
        }
      } catch (e) {
        console.log(e)
      }
    };
    readStorage();
  }, [path]) 

  useEffect(() => {
    // connect to the socketio server
    console.log("connect to the socketio server")
    global.socket = io(API_ADDRESS, {path: SOCKETIO_PATH});

    AsyncStorage.getItem('token', (err, result) => {
      if (err) {
        cosole.error(err)
        return
      }
      if (result) {
        const token = result.replace(/"/g, '');
        global.socket.on('connect', () => {
          global.socket.emit('chat: customer join', {token});
        })
      }
    })

    global.socket.on('chat: message', newMessage =>{
      console.log("newMessage", newMessage)
      setNewMessageBadge("!")
    })
  }, [])
  
  return (
    <NavigationContainer style={styles.container}>
      <Text style={styles.header}></Text>

      <Stack.Navigator screenOptions={{headerShown:false}}>      
        
        <Stack.Screen name="TabMe">
          {(props) => <TabMe {...props}
            products={products}
            isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
            qtyCart={qtyCart} setQtyCart={setQtyCart}
            cart={cart} setCart={setCart}
            newMessageBadge={newMessageBadge} setNewMessageBadge={setNewMessageBadge}
          />}
        </Stack.Screen>

        <Stack.Screen name="Category">
          {(props) => <Category {...props} products={products} />}
        </Stack.Screen>
        <Stack.Screen name="Product">
          {(props) => <Product {...props}
            qtyCart={qtyCart} setQtyCart={setQtyCart} cart={cart} setCart={setCart}/>
          }
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator()
function TabMe({products, isLoggedIn, setIsLoggedIn, qtyCart, setQtyCart, cart, setCart, newMessageBadge, setNewMessageBadge}) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: 'ghostwhite' }}
      
      screenOptions={ ({ route }) => ({
        tabBarIcon: ({ focused, color="orange", size=24 }) => {
          let iconName
          if (route.name === 'Home') {
            iconName = focused ? 'home': 'home-outline'
          } else if (route.name === 'Category') {
            iconName = focused ? 'list': 'list-outline'
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications': 'notifications-outline'
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart': 'cart-outline'
          } else if (route.name === 'User') {
            iconName = focused ? 'settings': 'settings-outline'
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles': 'chatbubbles-outline'
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name='Home'>
        {(props) => <Home {...props} products={products} />}
      </Tab.Screen>
      <Tab.Screen name='Category' component={Categories}/>
      <Tab.Screen name='Notification' component={Notifications}
        options={{ tabBarBadge: 0 }}
      />
      <Tab.Screen name='Cart' options={{ tabBarBadge: qtyCart }}>
        {(props) => <Carts
          {...props} isLoggedIn={isLoggedIn}
          qtyCart={qtyCart} setQtyCart={setQtyCart}
          cart={cart} setCart={setCart}
        />}
      </Tab.Screen>
      <Tab.Screen name='User'>
        {(props) => <User {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
      <Tab.Screen name='Chat' options={{ tabBarBadge: newMessageBadge }}>
        {(props) => <Chat {...props} setNewMessageBadge={setNewMessageBadge}/>}
      </Tab.Screen>
    </Tab.Navigator>
  )
};

const styles = StyleSheet.create({
});