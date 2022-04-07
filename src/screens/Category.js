import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Products from "../components/Products";

const Category = (props) => {
  let category = props.route.params.category
  let products = props.products

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.name]}>{category.category_name}</Text>
      <Products products={
        products.filter(product => product.category_id === category.category_id)}/>
    </View>
  );
}

export default Category

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  name: {
    fontWeight: "bold",
    padding: 10,
    paddingBottom: 0,
    fontSize: 30,
    textAlign: "center",
  },
});