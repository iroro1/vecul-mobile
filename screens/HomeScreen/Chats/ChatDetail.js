import React from "react";
// import { PanGestureHandler } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import CarDetailChat from "./CarDetailChat";
import ChatDetailMain from "./ChatDetailMain";

const Stack = createStackNavigator();

const ChatDetail = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="ChatDetailMain"
        component={ChatDetailMain}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="CarDetailChat"
        component={CarDetailChat}
      />
    </Stack.Navigator>
  );
};

export default ChatDetail;
