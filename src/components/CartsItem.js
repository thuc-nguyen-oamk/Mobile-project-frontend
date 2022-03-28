import { View, StyleSheet } from 'react-native';
import React from 'react';

const CartsItem = (props) => {
  return (
    <View style={styles.card}>{props.children}</View>
  )
}

export default CartsItem;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
  }
})