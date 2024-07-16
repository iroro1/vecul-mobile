import React from "react";
// import { PanGestureHandler } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import AccountPersonal from "./AccountPersonal";
import AccountVerification from "./AccountVerification";
import BVN from "./BVN";
import ChangePassword from "./ChangePassword";
import DriversLicense from "./DriversLicense";
import MoreHome from "./MoreHome";
import PersonalInfo from "./PersonalInfo";
import HostYouCars from "./HostYouCars";
import CarAddress from "./CarAddress";
import AddCarDetails from "./AddCarDetails";
import CarFeatures from "./CarFeatures";
import CarPictures from "./CarPictures";
import PriceAvail from "./PriceAvail";
import CarDetail from "./CarDetail";
import RentedCars from "../RentedCars";
// import AddCar from "../CarListings/AddCar";
import HostCarList from "./HostCarList";
import HostFeatures from "./HostFeatures";
import StoreDetails from "./StoreDetails";
import AddAccountHost from "./AddAccountHost";
import MyEarnings from "./MyEarnings";
import Messages from "./Messages";
import RentalsScreen from "./Rentals";
import AccUpdate from "./AccUpdate";
import HostingAs from "./HostingAs";
import StoreCreateSuccess from "./StoreCreateSuccess";
import VehicleAddress from "./VehicleAddress";
import OwnersCondition from "./OwnersCondition";
import PickupCondition from "./Rentals/PickupCondition";

const Stack = createStackNavigator();
const More = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="MoreHome"
        component={MoreHome}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OwnersCondition"
        component={OwnersCondition}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="VehicleAddress"
        component={VehicleAddress}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PersonalInfo"
        component={PersonalInfo}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PickupCondition"
        component={PickupCondition}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AccountPersonal"
        component={AccountPersonal}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HostingAs"
        component={HostingAs}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AccountVerification"
        component={AccountVerification}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ChangePassword"
        component={ChangePassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="BVN"
        component={BVN}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="StoreDetails"
        component={StoreDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="DriversLicense"
        component={DriversLicense}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="StoreCreateSuccess"
        component={StoreCreateSuccess}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HostYouCars"
        component={HostYouCars}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CarAddress"
        component={CarAddress}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddCarDetails"
        component={AddCarDetails}
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
        component={RentedCars}
      />
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="AddCar"
        component={AddCar}
      /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="HostCarList"
        component={HostCarList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="HostFeatures"
        component={HostFeatures}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddAccountHost"
        component={AddAccountHost}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MyEarnings"
        component={MyEarnings}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Messages"
        component={Messages}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RentalScreen"
        component={RentalsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AccUpdate"
        component={AccUpdate}
      />
    </Stack.Navigator>
  );
};

export default More;
