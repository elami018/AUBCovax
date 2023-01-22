import React from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";
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
import { Formik } from "formik";
import { SubmitButton } from "../components/forms";

const initializeFormValues = () => {
  return {
    id:"",
  };
}

function AccountScreen({navigation}) {
  const { Data, setData } = useContext(AuthContext);
  const handleLogin= (values,navigation) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'id':Data.pid})
        };
        fetch('http://'+global.c+':5000/certificate', requestOptions)
        .then(response => response.json())
        .then(data =>  {if(data.msg == 'Certificate sent by mail')
          {Alert.alert(data.msg)}
          else{Alert.alert(data.msg)}
          });
            
          } catch (error) {
            console.log("eeeee"+error);
          }
        }
        ;
  return (
    <Screen style={styles.screen}>
      <ScrollView>
      <View style={styles.container}>
        <ListItem
          title={Data.fname}
          />
      </View>
      <View style={styles.container}>
      <ListItem
              title="Personal Information:"
              IconComponent={
                <Icon
                  name="format-list-bulleted"
                  backgroundColor= "#000"
                />
              }
        />
        <PersonalInfo
              fullname={Data.fname} 
              id= {Data.pid}
              city={Data.city}
              country={Data.country}
              birthyear={Data.birthYear}
              phonenumber={Data.phone}
              medicalConditions={Data.medicalConditions}
            />
        <ListItem
              title="Dose Information"
              IconComponent={
                <Icon
                  name="needle"
                  backgroundColor="#000"
                />
              }
            />
          <DoseInfo
            name={Data.fname}
            dose1status={Data.dose1status}
            dose1date={Data.dose1date}
            dose1hour={Data.dose1hour}
            dose2status={Data.dose2status}
            dose2date={Data.dose2date}
            dose2hour={Data.dose2hour}
            />
        <Formik
              initialValues={initializeFormValues()}
              onSubmit={(values) => handleLogin(values,navigation)}
            >
            
            {({ values, setFieldValue }) => {
               return (      
            <View>
              <SubmitButton title="Download Certificate"/>
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
    marginVertical: 10,
  },
});

export default AccountScreen;
