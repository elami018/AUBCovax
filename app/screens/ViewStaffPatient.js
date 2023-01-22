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


function Table(){
  const { Data, setData } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text> Medical Staff </Text>
      <DataTable>
        {Data.meds.map(d=>
          <Card>
          <Card.Content>
          <Title>ID: {d[0]}</Title>
          <Paragraph>Full Name: {d[3]}</Paragraph>
        </Card.Content>
        </Card>
        )}
        
      <Text> Patients </Text>
      <DataTable>
        {Data.patients.map(d=>
          <Card>
          <Card.Content>
          <Title>ID: {d[1]}</Title>
          <Paragraph>Full Name: {d[0]}</Paragraph>
          <Paragraph>Phone Number: {d[2]}</Paragraph>
          <Paragraph>Email: {d[3]}</Paragraph>
        </Card.Content>
        </Card>
        )}
      </DataTable>
      </DataTable>
    </View>

    
    
  );
}

function ViewStaffPatient({navigation}) {
  return (
    <Screen style={styles.screen}>
      <ScrollView>
      <View>
            <Text>
        <Table></Table>
        </Text>
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

export default ViewStaffPatient;