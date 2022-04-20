import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  FlatList,
} from "react-native";
import mouse from "../../assets/mouse.png";
import background1 from "../../assets/backround 1.jpg";
const Item = ({ item }) => (
  <View>
    <Text style={styles.item}>{item.title}</Text>
    <Image source={item.image} style={styles.mouse} />
    <Text style={styles.item}>Price: ${item.price}</Text>
  </View>
);
const SHOP = [
  { title: "Hints", image: mouse, price: 2 },
  { title: "background 1", image: background1, price: 5 },
];

export default function ShopScreen() {
  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <ImageBackground
      source={require("../../assets/shopback.webp")}
      style={styles.backroundImage}
      resizeMode="cover"
    >
      <View>
        <Text>Shop</Text>

        <FlatList
          data={SHOP}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mouse: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
  },
  backroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  item: {
    color: "green",
    fontSize: 30,
  },
});
