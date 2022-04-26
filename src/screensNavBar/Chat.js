import jwt_decode from 'jwt-decode';
import React, {useEffect, useState, useRef} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

export default function Chat({navigation, setNewMessageBadge}) {
  const [messageText, setMessageText] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [adminId, setAdminId] = useState('7252643');
  const isFocused = useIsFocused();

  const flatListRef = useRef(null);

  useEffect(() => {
    global.socket.on('chat: force disconnect', data => {
      alert(data.msg);
    });

    global.socket.on('chat: join', data => {
      setMessageList(data.messageList);
    });

    global.socket.on('chat: message', newMessage => {
      setMessageList(prevState => [...prevState, newMessage]);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // setIsFocused(true);
      setNewMessageBadge(null);

      AsyncStorage.getItem('token', (err, result) => {
        if (err) {
          console.error(err);
          return;
        }

        if (!result) {
          alert('Please login first.');
          navigation.navigate('User');
          return;
        }

        const token = result.replace(/"/g, '');
        const customer = jwt_decode(token);

        if (!customer || !customer.customer_id) {
          alert('Please login first.');
          navigation.navigate('User');
          return;
        }

        setCustomerId(customer.customer_id);

        global.socket.emit('chat: customer join', {token});
      });
    });

    return unsubscribe;
  }, [navigation]);

  function sendMessage() {
    global.socket.emit('chat: message', {
      message_text: messageText,
      sender_id: customerId,
      receiver_id: adminId,
      room: customerId,
    });

    setMessageText('');
  }

  const MessageItem = ({item}) => {
    return (
      <View>
        <Text style={styles.incomingName}>
          {item.sender_id == customerId ? '' : 'Shop owner'}
        </Text>
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
  incomingName: {
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
