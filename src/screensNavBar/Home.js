import React from "react";
import { View, StyleSheet, TextInput, Image } from "react-native";
import Products from "../components/Products";
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import axios from "react-native-axios";

const Home = ({products}) => {
  const [searchText, setSearchText] = useState("")
        
  const path = ""
  const [brands, setBrands] = useState([])
  const [banner, setBanner] = useState({})
  useEffect(() => {
    function fetch(x) {
      axios
        .get(`${axios.defaults.baseUrl}/products/brands`)
        .then((res) => {
          let obj = []
          res.data.forEach((i,j) => {
            obj[j] = {id: j+1, name: i} 
          });          
          setBrands(obj)
        })
        .catch((err) => console.error(err))
    }
    fetch(path)
    
    function fetch1(x) {
      axios
        .get(`${axios.defaults.baseUrl}/banner`)
        .then((res) => {
          let _banners = res.data.bannerList
          setBanner(_banners[_banners.length-1])
        })
        .catch((err) => console.error(err))
    }
    fetch1(path)
  }, [path])

  const [selectedValue, setSelectedValue] = useState(0)

  function onSearchTextChange(text) {
    setSearchText(text)
  }
  
  let linkImg = `${axios.defaults.baseUrl}/images/${banner.banner_image}`
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

      <View style={styles.img}>
        <Image style={styles.banner} source={{uri: linkImg}} />
      </View>

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
    minHeight: 150,
    aspectRatio: 3.5, // When load img into backend, should set image size
    margin: 10,
    marginTop: 20,
  },
  img: {
    width: "98%",
  }
})

export default Home