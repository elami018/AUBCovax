import React from "react";
import { View, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import Text from "../Text";
import colors from "../../config/colors";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack'
import AppButton from "../Button";

function DoseInfo({
  renderRightActions,
  dose1status,
  dose1date,
  dose1hour,
  dose2status,
  dose2date,
  dose2hour,
  name
}) {
  return (
        <View>
            <Text style={styles.container} numberOfLines={8}>
                name: {name} {'\n'}
                first dose status: {dose1status} {'\n'}
                first dose date: {dose1date} {'\n'}
                first dose time: {dose1hour} {'\n'}
                second dose status: {dose2status} {'\n'}
                second dose date: {dose2date} {'\n'}
                second dose time: {dose2hour} {'\n'}
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

export default DoseInfo;
            