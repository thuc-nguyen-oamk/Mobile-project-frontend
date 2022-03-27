import React from "react"
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

const ProductsItem = (props) => {
  const linkImg = `${props.product.product_images}`
  return (
    <TouchableOpacity activeOpacity={0.5}
      onPress={props.onPress}
    >
      <View style={styles.container} flexDirection="column">
        <Image style={styles.img} source={{uri: linkImg}} />
        <Text style={[styles.text, styles.name]}>{props.product.product_name}</Text>

        <View style={styles.containerOneLine}>
          <Text style={[styles.text, styles.price]}>{props.product.product_price} $</Text>
          <View style={styles.rightContainerOneLine}>
            <Text style={[styles.text, styles.stock]}>{props.product.product_stock_total} pcs</Text>
          </View>
        </View>
        
        <View style={styles.containerOneLine}>
          <Text style={[styles.text, styles.discounted]}>{props.product.product_price_discounted} $</Text>
          <View style={styles.rightContainerOneLine}>
            {/* rating */}
          </View>
        </View>
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
    color: "gray",
    textDecorationLine: 'line-through',
  },
  discounted: {
    padding: 4,
    paddingLeft: 10,
    color: "red",
    fontWeight: "500",
  },
  containerOneLine: {
    flexDirection: "row",
    textAlign: "center",
  },
  rightContainerOneLine: {
    flex: 1,
    justifyContent: "flex-end",
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});