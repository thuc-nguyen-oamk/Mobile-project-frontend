import React from 'react'
import { StyleSheet, View, FlatList } from "react-native";
import CategoriesItem from "../components/CategoriesItem";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native'

const Categories = () => {
  const navigation = useNavigation()
  const [categories, setCategories] = useState([
    { category_id: 1, category_name: "Laptop", category_image: "https://i.imgur.com/qOLBSDX.png"  },
    { category_id: 2, category_name: "Mouse", category_image: "https://i.imgur.com/qOLBSDX.png" },
    { category_id: 3, category_name: "Keyboard", category_image: "https://i.imgur.com/qOLBSDX.png" },
    { category_id: 4, category_name: "Headphone", category_image: "https://i.imgur.com/qOLBSDX.png" },
    { category_id: 5, category_name: "Router", category_image: "https://i.imgur.com/qOLBSDX.png" },
    { category_id: 6, category_name: "Phone", category_image: "https://i.imgur.com/qOLBSDX.png" },
  ]);

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
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  containerChild: {
    paddingHorizontal: 8,
  },
});