import React, { useState, useEffect, useRef } from "react";

import { View, Text,Image, TouchableOpacity,StyleSheet,ImageBackground,TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase";

export default function InputScreen() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
const allRiddles = firebase.firestore().collection("riddles").doc("riddles");



  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ImageBackground source={require("../../assets/gamescreen.jpg")}style={styles.backroundImage} resizeMode="cover">


      <TextInput
      style={styles.input}
      placeholder="type your answer here"
      onChangeText={setQuestion}
      value={question}
      />
      <TextInput
      style={styles.input}
      placeholder="type your answer here"
      onChangeText={setAnswer}
      value={answer}
      />
      <TouchableOpacity
        onPress={() => {
          const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
allRiddles.update({
riddles: arrayUnion({"question": question, "answer": answer})
});
setQuestion("");
setAnswer("");

        }}
        style={styles.submit}
      >
        <Text  style={styles.submitText}>submit</Text>
      </TouchableOpacity>
</ImageBackground>
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
input:{
  height:50,
  color:"white",
  fontSize:15,
  borderWidth: 1,
  textAlign:"center"

}
})
