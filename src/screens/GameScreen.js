import React, { useState, useEffect, useRef } from "react";

import { View, Text,Image, TouchableOpacity,StyleSheet,ImageBackground,TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase";

export default function GameScreen() {
  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
   const [guess, setGuess] = useState("");
  //  const [proceed, setProceed] = useState(false);
  const firstUpdate = useRef(true);

  const allRiddles = firebase.firestore().collection("riddles").doc("riddles");

  useEffect(() => {
    let parsedValue;
    (async () => {
      try {
        let value = await AsyncStorage.getItem("level");
        if (value != null) {
          parsedValue = JSON.parse(value);
        }
        let riddles = await allRiddles.get();
        riddles = await riddles.data();
        riddles = riddles.riddles;
        setQuestion(riddles[level].question);
        setAnswer(riddles[level].answer);
      } catch (error) { }
    })();
    if (!firstUpdate.current) {
      firstUpdate.current = false;
      (async () => {
        try {
          let value = await AsyncStorage.getItem("level");
          if (value != null) {
            await AsyncStorage.setItem(
              "level",
              JSON.stringify(parsedValue + 1)
            );
          }
        } catch (error) { }
      })();
    }
  }, [level]);
  return (
    <View style={{ flex: 1}}>
    <TouchableOpacity
      onPress={() => {

      }}
      style={styles.buyHint}
    >
      <Text  style={styles.hints}>buy hints</Text>
    </TouchableOpacity>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ImageBackground source={require("../../assets/gamescreen.jpg")}style={styles.backroundImage} resizeMode="cover">
      <Text>GameScreen: {level}</Text>
      <View>
      <Text style={styles.questionText}>{question}</Text>
      </View>
      <TextInput
      style={styles.input}
      placeholder="type your answer here"
      onChangeText={setGuess}
      value={guess}
      />
<View style={styles.row}>
      <TouchableOpacity
        onPress={() => {
          if(guess.toLowerCase()===answer.toLowerCase()){
              setLevel(level + 1);
              setGuess("")
          }

        }}
        style={styles.submit}
      >
        <Text  style={styles.submitText}>submit</Text>
      </TouchableOpacity>
      <Image source={require("../../assets/mouse.png")}style={styles.mouse} />
      </View>
      </ImageBackground>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
backroundImage:{
  width: '100%',
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',

},
row:{
  flexDirection:"row"
},
mouse:{
  width:100,
  height:50,
  resizeMode: "contain"

},
submit:{
backgroundColor:"#FF6969",
},
submitText:{
  fontSize:20
},
questionText:{
  color:"yellow",
  fontSize:30
},
buyHint:{

alignItems:"baseline",

},
input:{
  height:50,
  color:"white",
  fontSize:15,
  borderWidth: 1,
  textAlign:"center"

}
})
