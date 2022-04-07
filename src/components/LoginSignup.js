import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, {useState} from 'react';
import Card from './Card';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginSignup = (props) => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const logIn = () => {
    axios
      .post(`${axios.defaults.baseUrl}/customers/login`, null, {
        auth: {
          username: email,
          password: password,
        },
      })
      .then(res => {
        const storeToken = async () => {
          try {
            let token = res.data.token
            token = token.replace(/"/g, '');
            await AsyncStorage.setItem('token', token)
            axios.defaults.headers['Authorization'] = `Bearer ${token}`
            alert("Login success")
            props.setIsLoggedIn(true)
          } catch (e) {
            console.error(e)
          }
        };
        storeToken()
      })
      .catch(err => alert("Wrong email or password"))
  };

  return (
    <View style={styles.container}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Text style={[styles.text, styles.label]}>Email</Text>
          <TextInput
            style={[styles.text, styles.input]}
            value={email}
            onChangeText={newText => setEmail(newText)}
          />
          
          <Text style={[styles.text, styles.label]}>Password</Text>
          <TextInput
            style={[styles.text, styles.input]}
            secureTextEntry
            value={password}
            onChangeText={newText => setPassword(newText)}
          />

          <View style={styles.buttonContainer}>
            <Button title="Login" color="#fb70ff" onPress={logIn} />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="SignUp"
              color="gray"
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </ScrollView>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "black"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    paddingBottom: 30,
  },
  buttonContainer: {
    marginTop: 30,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
});

export default LoginSignup