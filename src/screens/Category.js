import React from "react"
import { StyleSheet, View, Text } from "react-native"
import Products from "../components/Products"
import { useState, useEffect } from "react"

const Category = (props) => {
  let category = props.route.params.category

  const [products, setProducts] = useState([
    { product_id: 1, product_name: "Laptop1", product_images: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 1, product_price: 9, product_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 2, product_name: "Laptop2", product_images: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 1, product_price: 9, product_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 3, product_name: "Laptop3", product_images: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 2, product_price: 9, product_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 4, product_name: "Laptop4", product_images: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 2, product_price: 9, product_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 5, product_name: "Laptop5", product_images: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 3, product_price: 9, product_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 6, product_name: "Laptop6", product_images: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 3, product_price: 9, product_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 7, product_name: "Laptop7", product_images: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 4, product_price: 9, product_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 8, product_name: "Laptop8", product_images: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 4, product_price: 9, product_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 9, product_name: "Laptop9", product_images: "https://i.imgur.com/qOLBSDX.png", product_brand: "APPLE", category_id: 5, product_price: 9, product_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 10, product_name: "Laptop10", product_images: "https://i.imgur.com/qOLBSDX.png", product_brand: "DELL", category_id: 5, product_price: 9, product_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 11, product_name: "Laptop11", product_images: "https://i.imgur.com/qOLBSDX.png", product_brand: "DELL", category_id: 6, product_price: 9, product_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 12, product_name: "Laptop12", product_images: "https://i.imgur.com/qOLBSDX.png", product_brand: "DELL", category_id: 6, product_price: 9, product_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
    { product_id: 13, product_name: "Laptop13", product_images: "https://i.imgur.com/qOLBSDX.png", product_brand: "DELL", category_id: 6, product_price: 9, product_price_discounted: 6, product_description: "", product_rating: 5, product_stock_total: 8},
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