import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Linking } from "react-native";
import Button from "../components/Button";


function WelcomeScreen({navigation}) {
  return (
    <ImageBackground
      blurRadius={3}
      style={styles.background}
      resizeMode={'contain'}
      source={require("../assets/background.png")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.jpg")} />
        <Text style={styles.tagline}>AUBCOVAX</Text>
        <Text style={styles.tagline}>Login as:</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Patient" onPress={()=> navigation.navigate('Login')} />
        <Button title="Medical Personnel" onPress={()=> navigation.navigate('LoginMP')} color="secondary" />
        <Button title="Admin" onPress={()=> navigation.navigate("LoginAdmin")} color="navy" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 30,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 10,
  },
});

export default WelcomeScreen;
