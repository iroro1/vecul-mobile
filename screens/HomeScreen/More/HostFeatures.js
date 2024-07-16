import { useNavigation } from "@react-navigation/native";
import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../../../components/BackButton";
import tw from "twrnc";
import { COLORS } from "../../../utils/colors";
import ScreenWrapper from "../../ScreenWrapper";
const HostFeatures = () => {
  const navigation = useNavigation();

  return (
    <ScreenWrapper>
      <View
        style={{
          marginHorizontal: Platform.OS === "ios" ? "5%" : "0%",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <BackButton type={2} onPress={() => navigation.goBack()} />

        <Text
          style={{
            color: "#101928",
            fontWeight: "600",
            fontSize: 20,
          }}
        >
          Host Corner
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          marginHorizontal: Platform.OS === "ios" ? "5%" : "0%",
          gap: 20,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
          onPress={() => navigation.navigate("StoreDetails")}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              width: 40,
              backgroundColor: "#E3EFFC",
              borderRadius: 20,
              borderColor: "#ccc",
            }}
          >
            <Image source={require("../../../assets/moreIcons/store.png")} />
          </View>
          <Text style={{ color: "#101928", fontSize: 16, width: "100%" }}>
            Business details
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
          onPress={() => navigation.navigate("HostCarList")}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              width: 40,
              backgroundColor: "#E7F6EC",
              borderRadius: 20,
              borderColor: "#ccc",
            }}
          >
            <Image source={require("../../../assets/moreIcons/carlist.png")} />
          </View>
          <Text style={{ color: "#101928", fontSize: 16, width: "100%" }}>
            Vehicle list
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
          onPress={() => navigation.navigate("RentalScreen")}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              width: 40,
              backgroundColor: "#F4ECFF",
              borderRadius: 20,
              borderColor: "#ccc",
            }}
          >
            <Image source={require("../../../assets/moreIcons/host.png")} />
          </View>
          <Text style={{ color: "#101928", fontSize: 16, width: "100%" }}>
            Bookings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            position: "relative",
            width: "100%",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              width: 40,
              backgroundColor: "#E3EFFC",
              borderRadius: 20,
              borderColor: "#ccc",
            }}
          >
            <Image source={require("../../../assets/moreIcons/messages.png")} />
          </View>
          <View
            style={{
              fontSize: 16,
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
            }}
          >
            <Text
              style={{
                color: "#101928",
                fontSize: 16,
                gap: 5,
              }}
            >
              Messages
            </Text>
            <View style={tw`bg-[${COLORS.primary}] p-1 rounded-full px-2`}>
              <Text style={tw`text-[#fff] text-[12px] font-600`}>
                Coming soon
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
          onPress={() => navigation.navigate("MyEarnings")}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              width: 40,
              backgroundColor: "#E7F6EC",
              borderRadius: 20,
              borderColor: "#ccc",
            }}
          >
            <Image source={require("../../../assets/moreIcons/money.png")} />
          </View>
          <Text style={{ color: "#101928", fontSize: 16, width: "100%" }}>
            My earnings
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default HostFeatures;
