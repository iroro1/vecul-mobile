import React from "react";
// import { PanGestureHandler } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import ChatListM from "./ChatListM";
import ChatDetailM from "./ChatDetailM";
import CarDetailChatM from "./CarDetailChatM";

const Stack = createStackNavigator();
const Messages = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
      initialRouteName="ChatListM"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="ChatListM"
        component={ChatListM}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ChatDetailM"
        component={ChatDetailM}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CarDetailChatM"
        component={CarDetailChatM}
      />
    </Stack.Navigator>
  );
};

export default Messages;
