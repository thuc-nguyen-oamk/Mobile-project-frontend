import React from "react"
import { View, StyleSheet, TextInput, Keyboard, Button, Image } from "react-native"
import Products from "../components/Products"
import { Picker } from '@react-native-picker/picker'
import { useState, useEffect } from "react"
import Icon from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const [searchText, setSearchText] = useState("")

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

  const [brands, setBrands] = useState([
    { id: 1, name: "APPLE" },
    { id: 2, name: "DELL" },
  ])

  const [selectedValue, setSelectedValue] = useState(0)

  function onSearchTextChange(text) {
    setSearchText(text)
  }

  const linkImg = `https://i.imgur.com/zJ1hfKz.png`
  const size = 24
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <View style={styles.icon}>
          <Icon name="search-sharp" color="black" size={size} />
        </View>
        <TextInput
          style={[styles.text, styles.input]}
          onChangeText={onSearchTextChange}
          value={searchText}
          placeholder="Search"
          placeholderTextColor="grey"
        />
      </View>

      <View style={{ marginLeft: 14 }}>
        <Picker
          selectedValue={selectedValue}
          style={[styles.text, styles.picker]}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue)
          }}
          >
          <Picker.Item label="All" value={0} key={0} />
          { brands.map((brand) => (
            <Picker.Item label={brand.name} value={brand.id} key={brand.id}/>
            ))}
        </Picker>
      </View>

      <Image style={styles.banner} source={{uri: linkImg}} />

      <Products
        products={products.filter((item) =>
          selectedValue === 0
          ? item.product_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
          : (item.product_name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) &&
          item.product_brand === brands[selectedValue - 1].name)
          )}
          />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: "black"
  },
  banner: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 36,
    color: "red"
  },
  picker: {
    height: 50, 
    width: 150, 
    backgroundColor: '#c7dbff',
  },
  searchBar: {
    // justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderWidth:1,
    borderRadius: 15,
    borderColor: "grey",
    margin: 14,
  },
  input: {
    height: 40,
    width: "85%",
  },
  icon: {
    paddingLeft: 10
  },
  banner: {
    width: "98%",
    height: 200,
    margin: 10,
    marginTop: 20,
  }
})

export default Home