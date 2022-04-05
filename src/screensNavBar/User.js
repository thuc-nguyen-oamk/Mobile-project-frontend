import {View, StyleSheet} from 'react-native';
import React from 'react';

import LoginSignup from '../components/LoginSignup';
import UserProfile from '../components/UserProfile';

const User = ({isLoggedIn, setIsLoggedIn}) => {  
  return (
    <View style={styles.container}>
      {!isLoggedIn && <LoginSignup setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn && <UserProfile setIsLoggedIn={setIsLoggedIn} />}
    </View>
  );
};

User.navigationOptions = {
  headerTitle: 'Authenticate',
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  screen: {
    flex: 1,
  },
  screenCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
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

export default User;