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
import {Card, DataTable, Paragraph, Title} from 'react-native-paper';
import { Formik } from "formik";
import { SubmitButton } from "../components/forms";
import { FormField } from "../components/forms";
import { sendEmail } from "./SendEmail";
import "./ipAddress";
import {parseISO } from "date-fns";
import format from 'date-fns/format'

function Table(){
    const { Data, setData } = useContext(AuthContext);
    
    return (
        <View>
      <Text> Patients </Text>
      <DataTable>
        {Data.incomplete_doses.map(d=>
        <Card>
          <Card.Content>
          <Title>ID: {d[0]}</Title>
          <Paragraph>Full Name: {d[6]}</Paragraph>
          <Paragraph>Dose Date: {String(d[3]).substring(0,17) }</Paragraph>
          <Paragraph>Dose Time: {(8+parseInt(d[4]/60))}:{(parseInt(d[4]%60)==0)?'00':'30'}</Paragraph>
          <Paragraph>Dose number: {d[2]}</Paragraph>
        </Card.Content>
        </Card>
        )}
      </DataTable>
    </View>



);
}
const initializeFormValues = () => {
    return {
      id:''
    };
  }


function ViewAllDoses({navigation}) {
  const { Data, setData } = useContext(AuthContext);
  const handleLogin= (values,navigation) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'id':values.id})
        };
        console.log("rawa2")
        fetch('http://'+global.c+':5000/confirm', requestOptions)
        .then(response => response.json())
        .then(data =>  {if(data.Updated == true && data.updatedDose==2)
          {Alert.alert("Second Dose confirmed");
        navigation.navigate("AccountMP")}

        else if(data.Updated==true && data.updatedDose==1){
          Alert.alert("First Dose confirmed");
          navigation.navigate("AccountMP")
        }
          });
            
          } catch (error) {
            console.log("eeeee"+error);
          }
        }
        ;
        return(
        <Screen>
        <Formik
          initialValues={initializeFormValues()}
          onSubmit={(values) => handleLogin(values,navigation)}
        >
        {({ values, setFieldValue }) => {
                return (
        <ScrollView>
          <Text>
        <Table></Table>
        </Text>
        <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="rename-box"
                keyboardType="phone-pad"
                name="id"
                placeholder="Dose ID for confirmation"
                textContentType="none"
              />
          <SubmitButton title="Confirm"/>
        </ScrollView>)}}
        </Formik>
      </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
});

export default ViewAllDoses;
