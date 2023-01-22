import React from "react";
import { StyleSheet, Image, Text, View ,Button} from "react-native";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import AppButton from "../components/Button";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Formik } from "formik";
import { useContext } from "react";
import AuthContext from "../config/context";
import { ScrollView } from "react-native-gesture-handler";
import { number } from "yup/lib/locale";
import "./ipAddress";

const initializeFormValues = () => {
  return {
    number:"",
  };
}

function AccountScreenMP({navigation}) {
  const { Data, setData } = useContext(AuthContext);
  const handleLogin= (values,navigation) => {
    try {
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"number":values.number})
              };
        console.log("okkk")
        fetch('http://'+global.c+':5000/searchnumber', requestOptions)
          .then(response => response.json())
          .then(data =>  {if(data.found == true)
             {setData(data);
              navigation.navigate('ViewDose')}
                });
                  
                } catch (error) {
                  console.log("eeeee"+error);
                }
              }
              ;
    const handleOK= (values,navigation) => {
        try {
         const requestOptions = {
          method: 'GET',
         };
         console.log('meshe')
          fetch('http://'+global.c+':5000/viewdoses', requestOptions)
           .then(response => response.json())
            .then(data =>  {if(data.incomplete_doses !=null)
                 {console.log("ok");setData(data);
                  
         navigation.navigate('ViewAllDoses')}
                     //        navigation.navigate('Home')}
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
            >
            
            {({ values, setFieldValue }) => {
                    return (
      
      
            <View>
      
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="phone"
                keyboardType="phone-pad"
                name="number"
                placeholder="Search by phone number"
                textContentType="none"
              />
              <SubmitButton title="Search By Phone Number"/>
            </View>)}}
            </Formik>
            <Formik
              initialValues={initializeFormValues()}
              onSubmit={(values) => handleOK(values,navigation)}
            >
            
            {({ values, setFieldValue }) => {
                    return (      
            <View>
              <SubmitButton title="View All Pending Doses"/>
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
export default AccountScreenMP;
