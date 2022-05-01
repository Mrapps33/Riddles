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

export default function GameScreen({ route }) {
  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [guess, setGuess] = useState("");
  const [coins, setCoins] = useState(0);
  const allRiddles = firebase.firestore().collection("riddles").doc("riddles");
  const userDoc = firebase
    .firestore()
    .collection("Users")
    .doc(firebase.auth().currentUser.uid);

  useEffect(() => {
    /*Firebase listener */
    const observer = userDoc.onSnapshot(
      (docSnapshot) => {
        const userData = docSnapshot.get("data");
        setLevel(userData.level);
        setCoins(userData.coins);
      },
      (err) => { }
    );

    return observer;
  }, []);
  useEffect(() => {
    (async () => {
      try {
        let riddles = await allRiddles.get();
        riddles = await riddles.data();
        riddles = riddles.riddles;
        setQuestion(riddles[level].question);
        setAnswer(riddles[level].answer);
      } catch (error) { }
    })();
  }, [level]);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => { }}
        style={styles.buyHint}
      ></TouchableOpacity>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ImageBackground
          source={require("../../assets/gamescreen.jpg")}
          style={styles.backroundImage}
          resizeMode="cover"
        >
          <Text style={{ fontSize: 20, color: "yellow" }}>Level: {level}</Text>
          <View>
            <Text style={styles.questionText}>{question}</Text>
          </View>
          <TextInput
            placeholderTextColor="yellow"
            style={styles.input}
            placeholder="type your answer here"
            onChangeText={setGuess}
            value={guess}
          />
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                if (guess.toLowerCase() === answer.toLowerCase()) {
                  userDoc.update({ "data.level": level + 1 });

                  setGuess("");
                }
              }}
              style={styles.submit}
            >
              <Text style={styles.submitText}>submit</Text>
            </TouchableOpacity>
            <Image
              source={require("../../assets/mouse.png")}
              style={styles.mouse}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  backroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  mouse: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  submit: {
    backgroundColor: "#FF6969",
  },
  submitText: {
    fontSize: 20,
  },
  questionText: {
    color: "yellow",
    fontSize: 30,
    textAlign: "center",
  },
  buyHint: {
    alignItems: "baseline",
  },
  input: {
    height: 50,
    color: "white",
    fontSize: 15,
    borderWidth: 1,
    textAlign: "center",
  },
});
