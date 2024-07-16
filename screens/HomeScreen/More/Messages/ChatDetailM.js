import React from "react";
// import { PanGestureHandler } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import CarDetailChatM from "./CarDetailChatM";
import ChatDetailMainM from "./ChatDetailMainM";

const Stack = createStackNavigator();

const ChatDetailM = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="MMainM"
        component={ChatDetailMainM}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="CarDetailChatM"
        component={CarDetailChatM}
      />
    </Stack.Navigator>
  );
};

export default ChatDetailM;
