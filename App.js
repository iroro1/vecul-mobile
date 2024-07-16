import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { EventProvider } from "react-native-outside-press";
import { Provider } from "react-redux";
import AuthScreen from "./screens/AuthScreen";
import AuthStart from "./screens/AuthScreen/AuthStart";
import ConfirmForgotPassword from "./screens/AuthScreen/ConfirmForgotPassword";
import ForgotPassword from "./screens/AuthScreen/ForgotPassword";
import Login from "./screens/AuthScreen/Login";
import RequestSuccess from "./screens/AuthScreen/RequestSuccess";
import Verify from "./screens/AuthScreen/Verify";
import HomeScreen from "./screens/HomeScreen";
import BrandPick from "./screens/HomeScreen/CarListings/BrandPick";
import DateRangeScreen from "./screens/HomeScreen/CarListings/DateRangeScreen";
import SearchLocation from "./screens/HomeScreen/CarListings/SearchLocation";
import Notifications from "./screens/HomeScreen/Notifications";
import StartScreen from "./screens/StartScreen";
import { store } from "./store";

const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <EventProvider>
          <Stack.Navigator
            screenOptions={{
              headerBackTitleVisible: false,
            }}
          >
            <Stack.Screen
              options={{ headerShown: false }}
              name="StartScreen"
              component={StartScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="AuthScreen"
              component={AuthScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="RequestSuccess"
              component={RequestSuccess}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="LoginScreen"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="AuthStart"
              component={AuthStart}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="Verify"
              component={Verify}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="HomeScreen"
              component={HomeScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Notifications"
              component={Notifications}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ForgotPassword"
              component={ForgotPassword}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ConfirmForgotPassword"
              component={ConfirmForgotPassword}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="SearchLocation"
              component={SearchLocation}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="DateRangeScreen"
              component={DateRangeScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="BrandPick"
              component={BrandPick}
            />
          </Stack.Navigator>
        </EventProvider>
      </NavigationContainer>
    </Provider>
  );
}
