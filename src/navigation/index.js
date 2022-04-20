import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import GameScreen from "../screens/GameScreen";
import InputScreen from "../screens/InputScreen";
import ShopScreen from "../screens/ShopScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
export function AuthStackScreen() {
  const options = { headerShown: false };
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignInScreen"
        options={options}
        component={SignInScreen}
      />
      <AuthStack.Screen
        name="SignUpScreen"
        options={options}
        component={SignUpScreen}
      />
    </AuthStack.Navigator>
  );
}
export function MainStackScreen() {
  const navigation = useNavigation();

  const options = {
    headerLeft: () => (
      <Button
        onPress={() => navigation.navigate("HomeScreen")}
        title="back"
        color="#000"
      />
    ),
  };
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="HomeScreen"
        options={options}
        component={HomeScreen}
      />
      <MainStack.Screen
        name="GameScreen"
        options={options}
        component={GameScreen}
      />
      <MainStack.Screen
        name="InputScreen"
        options={options}
        component={InputScreen}
      />
      <MainStack.Screen
        name="ShopScreen"
        options={options}
        component={ShopScreen}
      />
    </MainStack.Navigator>
  );
}
