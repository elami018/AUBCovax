import React from "react";
import { View, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import Text from "../Text";
import colors from "../../config/colors";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack'
import AppButton from "../Button";

function ListItem({
  title,
  IconComponent,
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
        <View style={styles.container} >
          {IconComponent}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontWeight: "500",
  },
  
});

export default ListItem;
