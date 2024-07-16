import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { SET_PATH, authSelector } from "../../store/appSlice";
import { COLORS } from "../../utils/colors";
import CarListings from "./CarListings";
import Favorite from "./Favorite";
import More from "./More";
import RentedCars from "./RentedCars";
const Tab = createBottomTabNavigator();
const TabRoute = () => {
  const dispatch = useDispatch();
  const userStore = useSelector(authSelector);
  const isAuth = userStore?.id_token ? true : false;
  const authState = isAuth;
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, headerStyle: { height: 60 } }}
      // tabBar={({ props }) => <CustomButtomTab {...props} />}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="search"
                size={24}
                color={focused ? COLORS.primary : COLORS.greyDark}
              />
            );
          },
          tabBarHideOnKeyboard: true,
          tabBarLabel: "Search",
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: -10,
            width: "100%",
          },
        }}
        name="CarListings"
        component={CarListings}
        listeners={{
          tabPress: (e) => {
            navigation.navigate("CarListings");
            dispatch(SET_PATH("CarListings"));
          },
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="heart-outline"
                size={24}
                color={focused ? COLORS.primary : COLORS.greyDark}
              />
            );
          },
          tabBarHideOnKeyboard: true,
          tabBarLabel: "Favorites",
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: -10,
            width: "100%",
          },
        }}
        name="Favorite"
        component={Favorite}
        listeners={{
          tabPress: async (e) => {
            !authState && e.preventDefault();

            dispatch(SET_PATH("Favorite"));

            authState
              ? navigation.navigate("Favorite")
              : navigation.navigate("AuthStart");
          },
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="car-outline"
                size={24}
                color={focused ? COLORS.primary : COLORS.greyDark}
              />
            );
          },
          tabBarHideOnKeyboard: true,
          tabBarLabel: "Rentals",
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: -10,
            width: "100%",
          },
        }}
        name="RentedCars"
        listeners={{
          tabPress: (e) => {
            !authState && e.preventDefault();

            dispatch(SET_PATH("RentedCars"));

            authState
              ? navigation.navigate("RentedCars")
              : navigation.navigate("AuthStart");
          },
        }}
        component={RentedCars}
      />
      {/* <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="chatbox-outline"
                size={24}
                color={focused ? COLORS.primary : COLORS.greyDark}
              />
            );
          },
          tabBarHideOnKeyboard: true,
          tabBarLabel: "Inbox",
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: -10,
            width: "100%",
          },
        }}
        name="Chats"
        component={Chats}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();

            authState
              ? navigation.navigate("Chats")
              : navigation.navigate("AuthStart");
          },
        }}
      /> */}
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="ellipsis-horizontal"
                size={24}
                color={focused ? COLORS.primary : COLORS.greyDark}
              />
            );
          },
          tabBarHideOnKeyboard: true,
          tabBarLabel: "More",
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: -10,
            width: "100%",
          },
        }}
        name="More"
        component={More}
        listeners={{
          tabPress: (e) => {
            dispatch(SET_PATH("More"));
            !authState && e.preventDefault();
            authState
              ? navigation.navigate("More")
              : navigation.navigate("AuthStart");
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoute;
