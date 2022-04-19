import React from 'react';
import { StyleSheet, View, FlatList } from "react-native";
import CategoriesItem from "../components/CategoriesItem";
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import axios from "react-native-axios";

const Categories = () => {
  const navigation = useNavigation()

  const path = ""
  const [categories, setCategories] = useState([])
  useEffect(() => {
    function fetchOne(x) {
      axios
        .get(`${axios.defaults.baseUrl}/categories`)
        .then((res) => {
          setCategories(res.data)
        })
        .catch((err) => console.error(err))
    }
    fetchOne(path)
  }, [path])  

  return (
    <View style={styles.container}>
        <FlatList
          data={categories}
          numColumns={2}
          renderItem={({ item }) => 
            <View style={styles.wrap}>
              <CategoriesItem category={item} 
                // onPress={() => navigation.navigate("Category", {
                onPress={() => navigation.push("Category", {
                  category: item
                })}
              />
            </View>
          }
          keyExtractor={item => item.category_id}
          contentContainerStyle={styles.containerChild}
        />
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  wrap: {
    flex: 1/2,
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  containerChild: {
    paddingHorizontal: 8,
  },
});