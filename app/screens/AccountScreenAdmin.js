import React from "react";
import { StyleSheet, View, FlatList, Alert , Text} from "react-native";
import { useContext } from "react";
import AuthContext from "../config/context";
import { ListItem, ListItemSeparator, PersonalInfo, DoseInfo} from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppButton from "../components/Button";
import { ScrollView } from "react-native-gesture-handler";
import {DataTable, Card, Title, Paragraph} from 'react-native-paper';
import { Formik } from "formik";
import { FormField } from "../components/forms";
import { SubmitButton } from "../components/forms";

const initializeFormValues = () => {
  return {
    number:"",
  };
}
const initializeFormValues2 = () => {
  return {
    name:"",
  };
}

function AccountScreenAdmin({navigation}) {
  const { Data, setData } = useContext(AuthContext);
  const handleLogin= (values,navigation) => {
    try {
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"number":values.number})
              };
        console.log("okk")
        fetch('http://'+c+':5000/searchnumber', requestOptions)
          .then(response => response.json())
          .then(data =>  {if(data.found == true)
             {setData(data);
              navigation.navigate('ViewDose')}
          //        navigation.navigate('Home')}
                });
                  
                } catch (error) {
                  console.log("eeeee"+error);
                }
              }
              ;
              const handleLog= (values,navigation) => {
                try {
                    const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({"name":values.name})
                          };
                    console.log("okkk")
                    fetch('http://'+global.c+':5000/searchname', requestOptions)
                      .then(response => response.json())
                      .then(data =>  {if(data.found == true)
                         {setData(data);
                          navigation.navigate('ViewDose')}
                      //        navigation.navigate('Home')}
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
                              fetch('http://'+global.c+':5000/adminview', requestOptions)
                               .then(response => response.json())
                                .then(data =>  {
                                     {console.log("ok");setData(data);
                                      
                             navigation.navigate('ViewStaffPatient')}
                                         //        navigation.navigate('Home')}
                                  });
                                                 
                             } catch (error) {
                                 console.log("eeeee"+error);
                                  }
                                   }
                            ;
  return (
    <Screen style={styles.screen}>
      <ScrollView>
      <View>
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
              initialValues={initializeFormValues2()}
              onSubmit={(values) => handleLog(values,navigation)}
            >
            
            {({ values, setFieldValue }) => {
                    return (
      
      
            <View>
      
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="rename-box"
                keyboardType="default"
                name="name"
                placeholder="Search by name"
                textContentType="none"
              />
              <SubmitButton title="Search By Name"/>
            </View>)}}
            </Formik>
            <Formik
              initialValues={initializeFormValues()}
              onSubmit={(values) => handleOK(values,navigation)}
            >
            
            {({ values, setFieldValue }) => {
               return (      
            <View>
              <SubmitButton title="View Medical Staff & Patients"/>
            </View>)}}
            </Formik>
      </View>
      </ScrollView>
      <AppButton
        title="Log Out"
        onPress={()=> navigation.navigate('Home')}/>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    paddingTop: 10,
    paddingHorizontal: 30,
  },
});

export default AccountScreenAdmin;