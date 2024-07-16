import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TabRoute from "./TabRoute";
const Stack = createStackNavigator();
const HomeScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="TabRoute"
    >
      <Stack.Screen name="TabRoute" component={TabRoute} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
