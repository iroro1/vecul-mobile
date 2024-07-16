import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HostYouCars from "./HostYouCars";
import PickupCondition from "./PickupCondition";
import StartRentalScreen from "./StartRentalScreen";
import ExtendRentalScreen from "./ExtendRentalScreen";
import PaymentScreen from "./PaymentScreen";
import PaymentSuccessScreen from "./PaymentSuccessScreen";
const Stack = createStackNavigator();

const RentedCars = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="HostYouCars"
        component={HostYouCars}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PickupCondition"
        component={PickupCondition}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="StartRentalScreen"
        component={StartRentalScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ExtendRentalScreen"
        component={ExtendRentalScreen}
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
        name="CarAddress"
        component={CarAddress}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CarFeatures"
        component={CarFeatures}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CarPictures"
        component={CarPictures}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PriceAvail"
        component={PriceAvail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CarDetailMain"
        component={CarDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RentCarMain"
        component={RentCar}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddCar"
        component={AddCar}
      /> */}
    </Stack.Navigator>
  );
};

export default RentedCars;
