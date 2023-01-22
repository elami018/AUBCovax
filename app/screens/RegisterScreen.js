import React from "react";
import { ScrollView, StyleSheet ,View, Button} from "react-native";
import * as Yup from "yup";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Screen from "../components/Screen";
import AppButton from "../components/Button";
import { Form, FormField, SubmitButton } from "../components/forms";
import { Formik } from "formik";
import { sendEmail } from "./SendEmail";
import "./ipAddress";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  id: Yup.number().required().label("ID"),
  birthyear: Yup.number().required().label("Date of Birth"),
  phone: Yup.number().required().label("Phone number"),
  email: Yup.string().required().email().label("Email"),
  city: Yup.string().required().label("City"),
  medicalCondition: Yup.string().required().label("Medical Condition"),
  password: Yup.string().required().min(4).label("Password"),
});

const initializeFormValues = () => {
  return {
   name:"",
   id:'',
   username:"",
   birthyear:"",
   phone:"",
   email:"",
   city:"",
   medicalCondition:"",
   password: "",
   country: "",
  };
}


function RegisterScreen({navigation}) {
  const handleRegister= (values,navigation) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "name":values.name,
          'username':values.username,
          'email':values.email,
          'birthyear':values.birthyear,
          'number':values.phone,
          'city':values.city,
          'country':values.country,
          'medicalConditions':values.medicalCondition,
          'id': values.id,
          'password': values.password})
    };
    console.log("aaa")
    fetch('http://'+global.c+':5000/registerp', requestOptions)
        .then(response => response.json())
        .then(data => {if(data.Added == true)
        {console.log("user added");
        navigation.navigate('Login',)}
      else if (data.Added == false){
        console.log(data.msg)
      }
      }        
      );
  
        } catch (error) {
          console.log("eeeee"+error);
        }
      }
  ;
  return (
    <Screen style={styles.container}>
      <Formik
        initialValues={initializeFormValues()}
        onSubmit={(values) => handleRegister(values,navigation)}
        validationSchema={validationSchema}
      >
      {({ values, setFieldValue }) => {
              return (
      <ScrollView>
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="rename-box"
          keyboardType="default"
          name="name"
          placeholder="Full Name"
          textContentType="name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="rename-box"
          keyboardType="phone-pad"
          name="id"
          placeholder="ID number"
          textContentType="none"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="calendar-range"
          name="birthyear"
          placeholder="Birthyear"
          textContentType="none"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="cellphone"
          keyboardType="phone-pad"
          name="phone"
          placeholder="Phone number"
          textContentType="telephoneNumber"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="map-marker"
          keyboardType="default"
          name="city"
          placeholder="City"
          textContentType="none"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="map-marker"
          keyboardType="default"
          name="country"
          placeholder="Country"
          textContentType="none"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="pill"
          name="medicalCondition"
          placeholder="Med-Condition"
          textContentType="none"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="rename-box"
          keyboardType="default"
          name="username"
          placeholder="Username"
          textContentType="name"
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
        <SubmitButton title="Register"/>
      </ScrollView>)}}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 1,
  },
});

export default RegisterScreen;
