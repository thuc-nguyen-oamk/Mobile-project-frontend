import jwt_decode from 'jwt-decode';
import React, {useEffect, useState,useRef} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';

export default function Chat({navigation}) {
  const [messageText, setMessageText] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [adminId, setAdminId] = useState('7252643');

  const flatListRef = useRef(null);
  
  console.log('Chat comp is rendered');
  console.log('messageList:', messageList);
  console.log('messageList:', messageList);
  console.log('customerId:', customerId);
  console.log('adminId:', adminId);

  useEffect(() => {
    console.log('Chat comp useEffect');
    //get from storage
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6NzUsImN1c3RvbWVyX2VtYWlsIjoiZGFuaWxhQGdtYWlsLmNvbSIsImN1c3RvbWVyX25hbWUiOiJEYW5pbGEiLCJjdXN0b21lcl9hZGRyZXNzIjoiVXVzaWthdHUgMTIzLCBPdWx1LCBGaW5sYW5kIiwiY3VzdG9tZXJfcGhvbmUiOiIxMjM0NTY3ODkiLCJpYXQiOjE2NDk1ODU1MjF9.W5M7EeXbJx_JGGe9JAbxVFOlrptncDXE1tyYh6fWdj8';
    const customer = jwt_decode(token);
    if (!customer || !customer.customer_id) {
      alert('Please login first.');
      // navigation.navigate('User');
      return;
    }
    setCustomerId(customer.customer_id);
    // apis then set adin id

    global.socket = io('https://api.uniproject.xyz/', {
      path: '/eshopmb/socket.io/',
    });

    global.socket.on('connect', () => {
      global.socket.emit('customer join', {token});
    });

    global.socket.on('force disconnect', data => {
      alert(data.msg);
    });

    global.socket.on('join', data => {
      setMessageList(data.messageList);
    });

    global.socket.on('message', newMessage => {
      console.log('newMessage:', newMessage);
      console.log("socket.on('message:", 'event happened');
      console.log('messageList:', messageList);
      setMessageList(prevState => [...prevState, newMessage]);
    });
  }, []);

  // useEffect(() => {
  //   async function fetchCustomerList() {
  //     let token = await AsyncStorage.getItem('token');
  //     token = token.replace(/"/g, '');

  //     await apis.GetCustomerList(token).then(response => {
  //       setCustomerList(response);
  //       console.log(response);
  //     });
  //   }

  //   fetchCustomerList();
  // }, []);

  function sendMessage() {
    console.log('sendMessage:', 'event happened');
    global.socket.emit('message', {
      message_text: messageText,
      sender_id: customerId,
      receiver_id: adminId,
      room: customerId,
    });
    // setMessageList([
    //   ...messageList,
    //   {
    //     sender_id: customerId,
    //     receiver_id: adminId,
    //     message_text: messageText,
    //   },
    // ]);
    setMessageText('');
  }

  const MessageItem = ({item}) => {
    return (
      <View>
        <Text style={styles.incomingName}>{item.sender_id == customerId ? "" : "Shop owner"}</Text>
        <Text
          style={
            item.sender_id == customerId
              ? [styles.shadow, styles.outgoing]
              : [styles.shadow, styles.incoming]
          }>
          {item.message_text}
        </Text>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Contact Store</Text>
        </View>
        <FlatList
        ref={flatListRef}
        onContentSizeChange={() => flatListRef.current.scrollToEnd()}
          data={messageList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={MessageItem}
        />
        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            placeholder="Message here..."
            placeholderTextColor="#BDBDBD"
            value={messageText}
            onChangeText={setMessageText}
            onSubmitEditing={sendMessage}
          />
          <Icon
            name="arrow-up-circle"
            size={40}
            color="#F9ABF9"
            onPress={() => sendMessage()}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
  },
  content: {},
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f6f6f6',
    borderRadius: 25,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 20,
  },
  textInput: {
    width: '70%',
  },
  incoming: {
    alignSelf: 'flex-start',
    backgroundColor: '#F6F6F6',
    marginLeft: 10,
    marginBottom: 10,
    padding: 10,
  },
  incomingName:{
    marginLeft: 15,
    fontSize: 10,
    color: '#ccc',
  },
  outgoing: {
    alignSelf: 'flex-end',
    backgroundColor: '#f9abf9',
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  
});
