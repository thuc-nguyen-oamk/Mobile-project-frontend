import {Button, ScrollView, StyleSheet, View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import Card from '../components/Card';
import axios from 'react-native-axios';

const SignUp = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({
    customer_email: '',
    customer_password: '',
    customer_name: '',
    customer_address: '',
    customer_phone: '',
  });
  const _setUserInfo = (obj) => setUserInfo({...userInfo, ...obj})

  const signUp = () => {
    axios
      .post(`${axios.defaults.baseUrl}/customers/register`, userInfo)
      .then(res => {
        if (res.status === 200){
          alert("Username or email exists. Please choose another one")
        } else if (res.status === 201) {
          alert("Signing up success.")
          navigation.goBack()
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.authContainer}>
        <ScrollView>

        <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.text, styles.input]}
            value={userInfo.customer_email}
            onChangeText={newText => _setUserInfo({customer_email: newText})}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.text, styles.input]}
            secureTextEntry
            value={userInfo.customer_password}
            onChangeText={newText => _setUserInfo({customer_password: newText})}
          />
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.text, styles.input]}
            value={userInfo.customer_name}
            onChangeText={newText => _setUserInfo({customer_name: newText})}
          />
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.text, styles.input]}
            value={userInfo.customer_address}
            onChangeText={newText => _setUserInfo({customer_address: newText})}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.text, styles.input]}
            value={userInfo.customer_phone}
            onChangeText={newText => _setUserInfo({customer_phone: newText})}
            keyboardType="phone-pad"
          />

          <View style={styles.buttonContainer}>
            <Button title="Sign Up" color="red" onPress={signUp} />
          </View>
          <View style={styles.buttonContainer}>
          </View>
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
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

export default SignUp;