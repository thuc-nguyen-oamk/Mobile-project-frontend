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

import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'react-native-axios';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator()
export default function App() {
  axios.defaults.baseUrl = "https://api.uniproject.xyz/eshopmb/"

  const path = ""
  const [products, setProducts] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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

    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        if (token) {
          setIsLoggedIn(true)
        }
      } catch (e) {
        console.log(e)
      }
    };
    checkToken();
  }, [path]) 
  
  return (
    <NavigationContainer style={styles.container}>
      <Text style={styles.header}></Text>

      <Stack.Navigator screenOptions={{headerShown:false}}>      
        
        <Stack.Screen name="TabMe">
          {(props) => <TabMe {...props}
            products={products}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />}
        </Stack.Screen>

        <Stack.Screen name="Category">
          {(props) => <Category {...props} products={products} />}
        </Stack.Screen>
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="SignUp" component={SignUp} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator()
function TabMe({products, isLoggedIn, setIsLoggedIn}) {
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
      <Tab.Screen name='Cart' component={Carts}
        options={{ tabBarBadge: 0 }}
      />
      <Tab.Screen name='User'>
        {(props) => <User {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
};

const styles = StyleSheet.create({
});