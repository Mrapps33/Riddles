import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { backroundImage } from "../../assets/backround.jpg";
import firebase from "firebase";

export default function HomeScreen({ navigation }) {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState("");
  let id;
  useEffect(() => {
    (async () => {
      id = await firebase.auth().currentUser.uid;
      let result = await firebase.firestore().collection("Users").doc(id).get();
      let data = result.data();
      setUsername(data.username);
    })();
  }, []);

  const onPress = () => {
    setCount(count + 1);
    console.log(count);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/backround.jpg")}
        style={styles.backroundImage}
        resizeMode="cover"
      >
        <Text style={styles.text}>welcome back {username}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "ShopScreen" }],
            });
          }}
          style={styles.button}
        >
          <Text style={styles.text}>shop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>{count}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("GameScreen", { docId: id });
          }}
        >
          <Text style={styles.text}>Play Button</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "InputScreen" }],
            });
          }}
        >
          <Text style={styles.text}>new question</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>levels</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            firebase.auth().signOut();
          }}
        >
          <Text style={styles.text}>Log Out</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "orange",
    margin: 20,
  },
  backroundImage: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 50,
  },
});
