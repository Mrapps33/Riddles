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
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase";
import { Snackbar } from "react-native-paper";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const createAccount = async () => {
    console.log("we made it HomeScreen");
    try {
      console.log("about to make a call");
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      firebase
        .firestore()
        .collection("Users")
        .doc(firebase.auth().currentUser.uid)
        .add({
          username: username,
          level: 1,
        });

      console.log("after call");
    } catch (error) {
      setErrorMessage(error.message);
      setVisible(true);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="enter Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="enter Password"
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="enter Username"
        onChangeText={setUsername}
        value={username}
      />

      <TouchableOpacity
        onPress={() => {
          createAccount();
        }}
        style={styles.submit}
      >
        <Text style={styles.submitText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignInScreen");
        }}
        style={styles.submit}
      >
        <Text style={styles.submitText}>Go to Log in</Text>
      </TouchableOpacity>
      <Snackbar
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
      >
        {errorMessage}
      </Snackbar>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
  },
});
