import React from "react"
import { StyleSheet, View, Text } from "react-native"
import Products from "../components/Products"
import { useState, useEffect } from "react"

const Category = (props) => {
  let category = props.route.params.category

  const [products, setProducts] = useState([
    { product_id: 1, product_name: "Laptop1", display_image: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 1, display_price: 9, display_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 2, product_name: "Laptop2", display_image: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 1, display_price: 9, display_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 3, product_name: "Laptop3", display_image: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 2, display_price: 9, display_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 4, product_name: "Laptop4", display_image: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 2, display_price: 9, display_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 5, product_name: "Laptop5", display_image: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 3, display_price: 9, display_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 6, product_name: "Laptop6", display_image: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 3, display_price: 9, display_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 7, product_name: "Laptop7", display_image: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 4, display_price: 9, display_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 8, product_name: "Laptop8", display_image: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 4, display_price: 9, display_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 9, product_name: "Laptop9", display_image: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 5, display_price: 9, display_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 10, product_name: "Laptop10", display_image: "https://i.imgur.com/qOLBSDX.png", product_brand: "DELL", category_id: 5, display_price: 9, display_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 11, product_name: "Laptop11", display_image: "https://i.imgur.com/qOLBSDX.png", product_brand: "DELL", category_id: 6, display_price: 9, display_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 12, product_name: "Laptop12", display_image: "https://i.imgur.com/qOLBSDX.png", product_brand: "DELL", category_id: 6, display_price: 9, display_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 13, product_name: "Laptop13", display_image: "https://i.imgur.com/qOLBSDX.png", product_brand: "DELL", category_id: 6, display_price: 9, display_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
  ]);

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