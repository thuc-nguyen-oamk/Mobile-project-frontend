import { View, Text, StyleSheet, Button, TouchableOpacity, Image, Icon } from 'react-native'
import React from 'react'
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';

const UserProfile = (props) => {

  const navigation = useNavigation()
  
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
    <View style={styles.container}>
  
        <TouchableOpacity style={styles.header}>
          <View style={styles.left}>
            <Image style={styles.img} source={{uri: "https://i.imgur.com/a5piz6z.png"}} />
          </View>
          <View style={styles.right}>
            <Text style={{fontWeight: "bold", fontSize:20}}>Welcome USER</Text>
            <View style={{backgroundColor:"#fff", padding:2, borderRadius:2}}>
              <Button title="Logout" color="#fb70ff" borderColor= "#fff" onPress={logOut} />
            </View>
          </View>
        </TouchableOpacity>
  
        
        <TouchableOpacity style={styles.row}>         
            <Icon name="cart-outline" style={styles.icon} />
            <Text style={styles.text}>My orders history</Text>          
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.row}
                          onPress ={() => {navigation.navigate ('EditProfile')}}
        >
            <Icon name="person-circle-outline" style={styles.icon} />  
            <Text style={styles.text}>Edit</Text>   
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.row}>
            <Icon name="help-circle-outline" style={styles.icon} />
            <Text style={styles.text}>Help center</Text>
        </TouchableOpacity>
      </View>
     
    )
}
  
export default UserProfile; 
  
const styles = StyleSheet.create({
  text: {
    color: 'black',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#fb70ff',
  },
  left: {
    padding: 20,
  },
  img: {
    width: 100,
    height: 100,
  },
  right: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '80%',
    height: 80,
    padding: 20,
    paddingBottom: 20,
    marginTop: 15,
  },
  icon: {
    color: 'blue',
    fontSize: 34,
  },
});


