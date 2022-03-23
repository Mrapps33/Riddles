import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
} from "react-native";

export default function ShopScreen() {
  return (
    <View>
      <Text>Shop</Text>
      // TODO: convert to conponent
      <View>
        <Text>Hints</Text>
        <Image
          source={require("../../assets/mouse.png")}
          style={styles.mouse}
        />
        <Text>Hint 1</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mouse: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
});
