import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import useToast from "../../hooks/useToast";
import { forgotPasswordApi } from "../../services/authService";
import { SETUP_STARTUP } from "../../store/appSlice";
import { isEmailValid } from "../../utils";
import { COLORS } from "../../utils/colors";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({ email: "" });
  const [load, setLoad] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const sendOtp = async () => {
    setLoad(true);
    try {
      if (isEmailValid(data?.email)) {
        const res = await forgotPasswordApi(data);
        console.log(res);
        if (res?.status === 200) {
          dispatch(SETUP_STARTUP(data));
          navigation.navigate("RequestSuccess");
        } else {
          toast(
            "error",
            "Error",
            JSON.stringify(res?.response?.data?.message),
            2000
          );
        }
      } else {
        toast("error", "Error", "Invalid Email");
      }
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
          <Text
            style={{
              fontSize: 20,
              color: "#101928",
              marginTop: 58,
              fontWeight: "700",
            }}
            allowFontScaling={false}
          >
            Reset password
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
            Please enter the email address linked to your account
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
              onChange={(e) => setData({ email: e })}
              label="Email Address"
              keyType="email-address"
              required
              placheHolder="e.g henry@mail.com"
            />
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
            disabled={data.email === ""}
            onPress={() => sendOtp()}
            w="100%"
            label="Request Password Reset "
            loading={load}
          />
        </View>
      </KeyboardAwareScrollView>
    </MotiView>
  );
};

export default ForgotPassword;
