import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react'

const Product = (props) => {
  let product = props.route.params.product
  const linkImg = `${product.product_images}`

  return (
    <View style={styles.container} flexDirection="column">
      <Image style={styles.img}
        source={{uri: linkImg}}
      />
      <Text style={[styles.text, styles.name]}>{product.product_name}</Text>
      <Text style={[styles.text, styles.brand]}>{product.product_brand}</Text>
      <Text style={[styles.text, styles.price]}>{product.product_price} $</Text>
    </View>
  )
}

export default Product

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20
  },
  text: {
    color: 'black',
  },
  img: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 36,
  },
  brand: {
    fontWeight: "bold",
    fontSize: 26,
  },
  price: {
    color: "red"
  }
})