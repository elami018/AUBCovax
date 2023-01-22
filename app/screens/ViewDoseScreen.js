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

function ViewDoseScreen({navigation}) {
  const { Data, setData } = useContext(AuthContext);
  
    return (
                <View style={styles.container}>
                    <DoseInfo
                      name={Data.fname}
                      dose1status={Data.dose1status}
                      dose1date={Data.dose1date}
                      dose1hour={Data.dose1hour}
                      dose2status={Data.dose2status}
                      dose2date={Data.dose2date}
                      dose2hour={Data.dose2hour}
                      />
                </View>
    );
  return (
    <Screen style={styles.screen}>
      <ScrollView>
      
      </ScrollView>
      <AppButton title="Confirm Dose" onPress={()=> navigation.navigate("Home")}/>
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

export default ViewDoseScreen;