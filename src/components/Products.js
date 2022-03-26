import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import ProductsItem from "./ProductsItem"
import { useNavigation } from '@react-navigation/native'

const Products = (props) => {
  const navigation = useNavigation()
  return (
    <View>
        <FlatList
          data={props.products}
          numColumns={2}
          renderItem={({ item }) => 
            <View style={styles.wrap}>
              <ProductsItem product={item}
                onPress={() => navigation.navigate("Product", {
                  product: item
                  }
                )}
              />
            </View>
          }
          keyExtractor={item => item.product_id}
          contentContainerStyle={styles.container1}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  container1: {
    paddingHorizontal: 8,
  },
});

export default Products