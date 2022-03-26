import React from "react"
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

const ProductsItem = (props) => {
  const linkImg = `${props.product.product_images}`
  return (
    <TouchableOpacity activeOpacity={0.5}
      onPress={props.onPress}
    >
      <View style={styles.container} flexDirection="column">
        <Image style={styles.img}
          source={{uri: linkImg}}
        />
        <Text style={[styles.text, styles.name]}>{props.product.product_name}</Text>
        <Text style={[styles.text, styles.price]}>{props.product.product_price} $</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ProductsItem

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: "white",
  },
  img: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
  },
  text: {
    color: "black",
  },
  name: {
    fontWeight: "bold",
    padding: 10,
    paddingBottom: 0,
  },
  price: {
    padding: 4,
    paddingLeft: 10,
    color: "red",
  },
});