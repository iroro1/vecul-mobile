import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CarDetail from "./CarDetail";
import Main from "./Main";
import Notifications from "../Notifications";
import NotificationDetail from "../Notifications/NotificationDetail";
import ListReviewsScreen from "./ListReviewsScreen";
import PaymentScreen from "./PaymentScreen";
import PaymentSuccessScreen from "./PaymentSuccessScreen";

const Stack = createStackNavigator();

const CarListings = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="CarListingsMain"
        component={Main}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CarDetail"
        component={CarDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ListReviewsScreen"
        component={ListReviewsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PaymentScreen"
        component={PaymentScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
      />
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="RentCar"
        component={RentCar}
      /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Notifications"
        component={Notifications}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="NotificationDetail"
        component={NotificationDetail}
      />
    </Stack.Navigator>
  );
};

export default CarListings;
