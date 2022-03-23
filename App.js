import { StatusBar } from "expo-status-bar";
import { initializeApp } from "firebase/app";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MainStackScreen, AuthStackScreen } from "./src/navigation";
import firebase from "firebase";

import firebaseConfig from "./keys";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [docName, setDocName] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        let value = await AsyncStorage.getItem("level");
        if (value === null) {
          await AsyncStorage.setItem("level", JSON.stringify(1));
        }
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((currentUser: any) => {
        console.log("This is the user", currentUser);
        setUser(currentUser);
        if (initializing) setInitializing(false);
      });
    return unsubscribe;
  }, [setUser]);

  return (
    <NavigationContainer>
      {user != null && <MainStackScreen />}
      {!user && <AuthStackScreen />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
