import { MotiView } from "moti";
import React from "react";
import { Image, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import BackButton from "../../components/BackButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const RequestSuccess = () => {
  const navigation = useNavigation();
  const sendOtp = async () => {
    navigation.navigate("ConfirmForgotPassword");
  };
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1, flex: 1, backgroundColor: "#fff" }}
      transition={{ type: "timing", delay: 500 }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
        }}
      >
        <Toast />
      </View>
      <BackButton onPress={() => navigation.navigate("LoginScreen")} />

      <KeyboardAwareScrollView
        style={{
          width: "100%",
          paddingHorizontal: "3%",
        }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "flex-start",
          paddingTop: 70,
        }}
      >
        <View
          style={{
            marginBottom: 10,
            paddingHorizontal: "3%",
          }}
        >
          <View
            style={{
              height: 150,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 150,
            }}
          >
            <View
              style={{
                gap: 25,
                marginTop: 30,
                marginBottom: 20,
                position: "relative",
              }}
            >
              <Image
                style={{
                  position: "absolute",
                  top: -30,
                  right: -10,
                }}
                source={require("../../assets/icons/bgsx.png")}
              />
              <Image source={require("../../assets/icons/fgsx.png")} />
            </View>

            <Text
              style={{
                color: "#101928",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              Check your email
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "#667185",
                fontSize: 12,
                fontWeight: "400",
                marginTop: 8,
                width: 350,
              }}
            >
              We want to make sure that it is you. A password reset link has
              been sent to your email.
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: "3%",
            position: "absolute",
            bottom: 40,
            width: "100%",
          }}
        >
          <CustomButton onPress={() => sendOtp()} w="100%" label="Verify" />
        </View>
      </KeyboardAwareScrollView>
    </MotiView>
  );
};

export default RequestSuccess;
