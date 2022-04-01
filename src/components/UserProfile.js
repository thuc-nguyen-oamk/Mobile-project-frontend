import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = (props) => {
  const logOut = () => {
    const removeToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
          await AsyncStorage.removeItem('token')
          delete axios.defaults.headers["Authorization"]
          alert("Logout success")
      } catch (e) {
        // remove error
      }
    };
    removeToken();
    props.setIsLoggedIn(false);
  }
  return (
    <View>
      <Text style={styles.text}>UserProfile</Text>

      <Button title="Logout" color="gray"
        onPress={logOut}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "black"
  },
})

export default UserProfile