import React from "react";
import { StyleSheet, Image, Text, View ,Button} from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import AppButton from "../components/Button";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Formik } from "formik";
import { useContext } from "react";
import AuthContext from "../config/context";
import { sendEmail } from "./SendEmail";
import "./ipAddress";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
});

const initializeFormValues = () => {
  return {
    username:"",
    password: "",
  };
}

function LoginScreen({navigation}) {
  const { Data, setData } = useContext(AuthContext);
  const handleLogin= (values,navigation) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'username':values.username ,
          'password': values.password})
        };
        fetch('http://'+global.c+':5000/loginpat', requestOptions)
        .then(response => response.json())
        .then(data =>  {if(data.found == true)
          {setData(data);
            navigation.navigate('Account')}
          });
            
          } catch (error) {
            console.log("eeeee"+error);
          }
        }
        ;
        return (
          
          <Screen style={styles.container}>

      <Formik
        initialValues={initializeFormValues()}
        
        onSubmit={(values) => handleLogin(values,navigation)}
        validationSchema={validationSchema}
      >
      {({ values, setFieldValue }) => {
              return (


      <View>

        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="rename-box"
          keyboardType="default"
          name="username"
          placeholder="Username"
          textContentType="none"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login"/>
        <Text style={styles.text}>Not Registered?</Text>
        <AppButton title="Register" onPress={()=> navigation.navigate("Register")}/>
      </View>)}}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  text:{
    fontSize: 16,
    justifyContent:'center',
    alignSelf:'center'
  }
});

export default LoginScreen;
