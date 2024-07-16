import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AnimatePresence } from "moti";
import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import { COLORS } from "../../utils/colors";

const AuthStart = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
      }}
      source={require("../../assets/images/auth.png")}
    >
      <AnimatePresence>
        <StatusBar animated style="dark" />

        <SafeAreaView
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1,
            minHeight: "100%",
            position: "relative",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <BackButton onPress={() => navigation.goBack()} />

          <View
            style={{
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={require("../../assets/images/logoWhite.png")} />
          </View>

          <View
            style={{
              paddingHorizontal: "3%",
            }}
          >
            {/* <VeculToolTip message="Testing my tolltip" /> */}
            {/* <VCheckbox iconSize={20} /> */}
            <View
              style={{
                marginBottom: 6,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: 18,
                }}
              >
                Find the ideal car to rent
              </Text>
              <Text
                style={{
                  color: "#F0F2F5",
                  fontWeight: "400",
                  fontSize: 14,
                  marginVertical: 4,
                }}
              >
                Browse through a diverse collection of cars, from sleek sedans
                to spacious SUVs.
              </Text>
            </View>
            <CustomButton
              onPress={() => navigation.navigate("AuthScreen")}
              label="Create a new account"
              style={{
                backgroundColor: COLORS.primary,
                borderWidth: 1,
                borderColor: COLORS.greyDark + "80",
                marginBottom: 10,
              }}
              textStyles={{
                color: "#fff",
                fontWeight: "700",
              }}
            />
            <CustomButton
              label="Login"
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: COLORS.primary,
                marginBottom: Platform.OS === "android" ? 20 : 100,
              }}
              textStyles={{
                color: COLORS.primary,
              }}
              onPress={() => navigation.navigate("LoginScreen")}
            />
          </View>
        </SafeAreaView>
      </AnimatePresence>
    </ImageBackground>
  );
};

export default AuthStart;
