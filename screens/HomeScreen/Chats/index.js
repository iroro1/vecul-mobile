import React from "react";
// import { PanGestureHandler } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import CarDetailChat from "./CarDetailChat";
import ChatDetail from "./ChatDetail";
import ChatList from "./ChatList";

const Stack = createStackNavigator();
const Chats = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="ChatList"
        component={ChatList}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ChatDetail"
        component={ChatDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CarDetailChat"
        component={CarDetailChat}
      />
    </Stack.Navigator>
  );
};

export default Chats;
