import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import { useSelector } from "react-redux";
import { COLORS } from "../utils/colors";
import useHelperFunctions from "../hooks/useHelperFunctions";

const CustomDrawer = (props) => {
  const { navigation, routes } = props;
  const { getFavoritesList } = useHelperFunctions();
  const favList = getFavoritesList();
  const notificationCount = favList?.length;
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#EBEBEB",
        flex: 1,
        paddingTop:
          Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: "3%",
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 5,
            borderRadius: 6,
            color: "#000",
            position: "absolute",
            right: -0,
          }}
        >
          <Ionicons
            onPress={() => navigation.toggleDrawer()}
            name="close"
            color={COLORS.greyDark}
            size={20}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingLeft: "20",
          width: "100%",
          justifyContent: "flex-start",
          marginTop: 0,
        }}
        onPress={() => navigation.navigate("TabRoute")}
      >
        <Ionicons
          style={{ marginLeft: 30 }}
          name="home-outline"
          size={15}
          color={COLORS.primary}
        />
        <Text style={{ width: "50%" }}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingLeft: "20",
          width: "100%",
          justifyContent: "flex-start",
          marginTop: 25,
        }}
        onPress={() => navigation.navigate("Favorite")}
      >
        <Ionicons
          style={{ marginLeft: 30 }}
          name="car-outline"
          size={15}
          color={COLORS.primary}
        />
        <Text style={{ width: "50%" }}>Favourite cars</Text>
        {notificationCount > 0 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              position: "relative",
            }}
          >
            <Ionicons name="heart" size={35} color={"#DC4747"} />
            <Text
              style={{
                color: "#fff",
                position: "absolute",
                fontSize: 10,
                left: 7,
                top: 9,
                fontWeight: "700",
              }}
            >
              +{notificationCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingLeft: "20",
          width: "100%",
          justifyContent: "flex-start",
          marginTop: 30,
        }}
        onPress={() => navigation.navigate("HowItWorks")}
      >
        <Ionicons
          style={{ marginLeft: 30 }}
          name="ios-newspaper-outline"
          size={15}
          color={COLORS.primary}
        />
        <Text style={{ width: "50%", color: COLORS.greyDark }}>
          How it works
        </Text>
        <View></View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingLeft: "20",
          width: "100%",
          justifyContent: "flex-start",
          marginTop: 30,
        }}
        onPress={() => navigation.navigate("ContactSupport")}
      >
        <Ionicons
          style={{ marginLeft: 30 }}
          name="mail-open-outline"
          size={15}
          color={COLORS.primary}
        />
        <Text style={{ width: "50%", color: COLORS.greyDark }}>
          Contact Support
        </Text>
        <View></View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingLeft: "20",
          width: "100%",
          justifyContent: "flex-start",
          marginTop: 30,
        }}
        onPress={() => navigation.navigate("InviteFriends")}
      >
        <Ionicons
          style={{ marginLeft: 30 }}
          name="share-outline"
          size={15}
          color={COLORS.primary}
        />
        <Text style={{ width: "50%", color: COLORS.greyDark }}>
          Invite Friends
        </Text>
        <View></View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingLeft: "20",
          width: "100%",
          justifyContent: "flex-start",
          marginTop: 30,
        }}
        onPress={() => navigation.replace("LoginScreen")}
      >
        <Ionicons
          style={{ marginLeft: 30 }}
          name="log-out-outline"
          size={15}
          color={COLORS.red}
        />
        <Text style={{ width: "50%", color: COLORS.greyDark }}>Logout</Text>
        <View></View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomDrawer;
