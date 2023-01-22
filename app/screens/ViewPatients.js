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

function ViewPatients({navigation}) {
  const { Data, setData } = useContext(AuthContext);
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
            dose1status={Data.dose1status}
            dose1date={Data.dose1date}
            dose1hour={Data.dose1hour}
            dose2status={Data.dose2status}
            dose2date={Data.dose2date}
            dose2hour={Data.dose2hour}
            />
        <ListItem
              title="Download Certificate"
              IconComponent={
                <Icon
                  name="certificate"
                  backgroundColor="#000"
                />
              }
        />
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

export default ViewPatients;
