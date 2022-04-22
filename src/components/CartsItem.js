import { View, StyleSheet, Text, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from "react-native-axios";

const CartsItem = (props) => {
  const linkImg = `${axios.defaults.baseUrl}/images/${props.item.product_images}`

  return (
    <View style={styles.card}>

      <View style={styles.left}>
        <Image style={styles.img} source={{uri: linkImg}} />
      </View>

      <View style={styles.right}>
        <Text style={[styles.text, styles.name]}>{props.item.product_name}</Text>
        
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={[styles.text, styles.price]}>{props.item.product_price}$ </Text>
            <Text style={[styles.text, styles.discounted]}> {props.item.product_price_discounted}$</Text>
          </View>
          <View style={styles.rowRight}>
            <Text style={[styles.text, styles.type]}>{props.item.product_color}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Icon name="remove-circle-outline" style={styles.icon} onPress={props.downQty} />
            <View style={styles.viewQty}>
              <Text style={[styles.text, styles.qty]}>{props.item.product_qty}</Text>
            </View>
            <Icon name="add-circle-outline" style={styles.icon} onPress={props.upQty} />
          </View>
          <View style={styles.rowRight}>
            <Icon name="trash-outline" style={styles.icon} onPress={props.deleteItem} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default CartsItem;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
  },
  text: {
    color: 'black',
  },
  img: {
    width: 100,
    height: 100,    
  },
  right: {
    flex: 1,
    padding: 8
  },
  row: {
    paddingTop: 4,
    paddingBottom: 4,
    flexDirection: "row",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  icon: {
    color: "red",
    fontSize: 32,
  },
  viewQty: {
    paddingLeft: 16,
    paddingRight: 16,
    
  },
  qty: {
  },
  price: {
    fontStyle: "italic",
    color: "gray",
    textDecorationLine: 'line-through',
  },
  discounted: {
    color: 'red',
    fontWeight: 'bold',
    fontStyle: "italic",
  }
})