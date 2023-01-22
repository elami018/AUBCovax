import React from "react";
import { View, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import Text from "../Text";
import colors from "../../config/colors";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack'
import AppButton from "../Button";

function PersonalInfo({
  renderRightActions,
  id,
  fullname,
  city,
  country,
  phonenumber,
  birthyear,
  medicalConditions,
}) {
  return (
        <View>
            <Text style={styles.container} numberOfLines={7}>
                FullName: {fullname} {'\n'}
                ID: {id} {'\n'}
                City: {city} {'\n'}
                Country: {country} {'\n'}
                Birthyear: {birthyear} {'\n'}
                Phonenumber: {phonenumber} {'\n'}
                Medical Condition: {medicalConditions} {'\n'}
            </Text>
          </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontWeight: "500",
    alignSelf:"center",
    lineHeight: 30,
}});

export default PersonalInfo;
            