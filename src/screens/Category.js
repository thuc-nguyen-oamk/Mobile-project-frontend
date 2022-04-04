import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Products from "../components/Products";
import { useState, useEffect } from "react";
import axios from "react-native-axios";

const Category = (props) => {
  let category = props.route.params.category

  const path = ""
  const [products, setProducts] = useState([])
  useEffect(() => {
    function fetchOne(x) {
      axios
        .get(`${axios.defaults.baseUrl}/products/`)
        .then((res) => {
          setProducts(res.data)
        })
        .catch((err) => console.error(err))
    }
    fetchOne(path)
  }, [path]) 

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