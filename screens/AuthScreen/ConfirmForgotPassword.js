import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";
import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import PasswordInputField from "../../components/PasswordInputField";
import {
  confirmForgotPasswordApi,
  forgotPasswordApi,
  resendCodeApi,
} from "../../services/authService";
import { COLORS } from "../../utils/colors";
import useToast from "../../hooks/useToast";
import Toast from "react-native-toast-message";
import BackButton from "../../components/BackButton";

const ConfirmForgotPassword = () => {
  const navigation = useNavigation();
  const store = useSelector((state) => state?.app?.setUpData);
  console.log(store);
  const { toast } = useToast();
  const [data, setData] = useState({
    email: store?.email,
    password: "",
    code: "",
  });
  const [load, setLoad] = useState(false);
  const sendOtp = async () => {
    setLoad(true);
    try {
      const res = await forgotPasswordApi({
        email: data.email,
      });
      if (res?.status === 200) {
        toast(
          "success",
          "Success",
          "Code sent successfully to your email",
          2000
        );
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  const confirmPassword = async () => {
    setLoad(true);
    try {
      const res = await confirmForgotPasswordApi(data);
      console.log(res, "res");

      if (res?.status === 200) {
        navigation.navigate("LoginScreen");
      } else {
        toast(
          "error",
          "Error",
          JSON.stringify(res?.response?.data?.message),
          2000
        );
      }
      // navigation.navigate("Verify")
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1, flex: 1, backgroundColor: COLORS.bg }}
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
      <BackButton onPress={() => navigation.goBack()} />
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
          <Text
            style={{
              fontSize: 20,
              color: "#101928",
              marginTop: 58,
              fontWeight: "700",
            }}
            allowFontScaling={false}
          >
            Confirm Forgot Password
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: 2,
              marginBottom: 20,
              fontWeight: "400",
              color: "#667185",
            }}
            allowFontScaling={false}
          >
            Please enter your new password.
          </Text>

          <View
            style={{
              gap: 25,
              marginTop: 30,
              marginBottom: 20,
            }}
          >
            <InputField
              fs={14}
              onChange={(e) => setData({ ...data, code: e })}
              label="Enter Code"
              placheHolder="123456"
            />

            <PasswordInputField
              onChange={(e) => {
                setData({ ...data, password: e });
              }}
              label="Password"
              placheHolder={"************"}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 30,
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity onPress={sendOtp}>
              <Text
                style={{
                  color: COLORS.primary,
                  marginLeft: 8,
                  fontWeight: "600",
                }}
                allowFontScaling={false}
              >
                Resend Otp
              </Text>
            </TouchableOpacity>
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
          <CustomButton
            onPress={() => confirmPassword()}
            w="100%"
            label="Reset password"
            loading={load}
            disabled={data?.code === "" || data?.password === ""}
          />
        </View>
      </KeyboardAwareScrollView>
    </MotiView>
  );
};

export default ConfirmForgotPassword;
