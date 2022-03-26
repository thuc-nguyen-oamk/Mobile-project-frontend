import React from "react"
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

const CategoriesItem = (props) => {
  const linkImg = `${props.category.category_image}`
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
      <View style={styles.container}>
        <Image style={styles.img} source={{uri: linkImg}} />
        <View style={{alignItems: "center"}}>
          <Text style={[styles.text, styles.name]}>{props.category.category_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CategoriesItem

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
    fontSize: 20,
  },
});
