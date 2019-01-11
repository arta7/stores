import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Version can be specified in package.json
import { TabNavigator, TabBarBottom } from "react-navigation"; // Version can be specified in package.json
import { Navigator } from "./Navigator";
import MainCategory from "./MainCategory";
import Login from "./Login";
export default TabNavigator(
  {
    رومارکت: { screen: Login },
    "دسته بندی": { screen: MainCategory }
  },
  {
    navigationOptions: ({ navigation }) => ({}),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",

    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "white",
      labelStyle: {
        fontSize: 16,
        marginBottom: "8%"
      },
      style: {
        backgroundColor: "#95DE5F"
      }
    },
    animationEnabled: false,
    swipeEnabled: false
  }
);
