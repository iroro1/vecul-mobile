import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import PasswordInputField from "../../components/PasswordInputField";
import useToast, { toastConfig } from "../../hooks/useToast";
import { decodeJwt } from "../../services";
import { loginApi, resendCodeApi } from "../../services/authService";
import { SET_AUTH_STATE } from "../../store/appSlice";
import { delayFn } from "../../utils";
import { COLORS } from "../../utils/colors";
import useLocalStorage from "../../hooks/useLocalStorage";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [data, setData] = useState({
    fullName: "",
    email: "ojigboleo+v1@gmail.com",
    password: "",
    confirmPassword: "",
  });
  const [load, setLoad] = useState(false);

  const disableFn = () => {
    if (data.email == "" || data.password == "") return true;
    return false;
  };
  const { storeDataObject } = useLocalStorage();

  const loginFn = async () => {
    setLoad(true);
    try {
      const res = await loginApi({
        email: data.email.toLowerCase().trim(),
        password: data.password,
      });
      if (+res?.status === 200) {
        const obj = {
          userResponse: {
            ...decodeJwt(res?.data?.data?.id_token),
            ...res?.data?.data,
          },
        };
        storeDataObject("expiredToken", { origin: res?.data?.data });
        storeDataObject("authState", obj);
        dispatch(SET_AUTH_STATE(obj?.userResponse));
        if (res?.data?.message.toLowerCase().includes("confirm sign up"))
          navigation.push("Verify");
        else if (res?.data?.message === "User is not confirmed.") {
          await resendVerificationOTP({
            email: data.email_or_username,
          });
          dispatch(SET_AUTH_STATE(data));
          navigation.push("Verify");
        } else {
          setData({});
          navigation.reset({
            index: 0,
            routes: [{ name: "HomeScreen" }],
          });
        }
      } else {
        toast(
          "error",
          "Error",
          JSON.stringify(res?.response?.data?.message),
          2000
        );
        if (res?.response?.data?.message.includes("not confirmed")) {
          await resendCodeApi({
            email: data.email_or_username,
          });

          dispatch(SET_AUTH_STATE(data));
          navigation.push("Verify", { ...data });
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
        }}
      >
        <Toast config={toastConfig} />
      </View>
      <StatusBar style="dark" />

      <BackButton onPress={() => navigation.goBack()} />

      <KeyboardAwareScrollView
        style={{ flex: 1, paddingBottom: 100, marginTop: 100 }}
      >
        <MotiView
          from={{ opacity: 0 }}
          animate={{
            opacity: 1,
            paddingHorizontal: "3%",
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            delay: 200,
          }}
        >
          <MotiView
            from={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
            }}
            transition={{
              delay: 100,
            }}
            style={{
              marginBottom: 37,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#101928",
              }}
            >
              Welcome back! 👋
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: "#667185",
                marginTop: 8,
              }}
            >
              Let's get you right back into{" "}
              <Text style={{ color: "#101928", fontWeight: "700" }}>
                Vecul.
              </Text>{" "}
            </Text>

            {/* <TouchableOpacity
                onPress={() => {
                  setData({
                    // email: "ojigboleo+v1@gmail.com",
                    // password: "123456Leo@",
                    email: "ajayiolaniyi+vecul2@gmail.com ",
                    password: "Password123!!!",
                  });
                  delayFn(loginFn, 4000);
                }}
                style={tw`mt-[20px] h-[44px]  rounded-[6px] border border-[#D0D5DD] flex flex-row gap-2 justify-center items-center`}
              >
                <Image
                  style={tw`w-[24px] h-[24px]`}
                  source={require("../../assets/icons/google.png")}
                />
                <Text style={{ fontSize: 14, fontWeight: "500" }}>
                  Continue with Google
                </Text>
              </TouchableOpacity> */}

            {/* <View style={tw`my-[24px] w-full flex flex-row itcems-center`}>
                <View style={tw`bg-[#D0D5DD] h-[1px] w-full relative`}></View>
                <View
                  style={tw`absolute text-[14px] font-[400] left-[45%] top-[-8px] bg-[#fff] w-[30px] flex-row items-center justify-center`}
                >
                  <Text>or</Text>
                </View>
              </View> */}

            <View style={tw`mt-5`}>
              <InputField
                bgColor="transparent"
                keyType={"email-address"}
                label="Email"
                onChange={(e) => {
                  setData({ ...data, email: e });
                }}
                placheHolder="e.g henry@mail.com"
              />
            </View>
            <View
              style={{
                marginTop: 23,
              }}
            >
              <PasswordInputField
                onChange={(e) => {
                  setData({ ...data, password: e });
                }}
                label="Password"
                placheHolder={"Password"}
              />
            </View>
          </MotiView>

          <>
            <TouchableOpacity
              style={{
                marginTop: 12,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 5,
              }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text
                style={{
                  color: "#1D2739",
                  fontWeight: "500",
                  fontSize: 14,
                  width: 110,
                }}
              >
                Reset password
              </Text>
              <Text
                style={{
                  color: COLORS.primary,
                  textDecorationLine: "underline",
                  width: 70,
                }}
              >
                Click here
              </Text>
            </TouchableOpacity>
          </>
        </MotiView>
      </KeyboardAwareScrollView>
      <View
        style={tw` w-full android:bottom-[20px] ios:bottom-[40px] px-[20px] left-0`}
      >
        <CustomButton
          style={{
            height: 44,
          }}
          disabled={disableFn() || load}
          label="Login"
          onPress={() => loginFn()}
          loading={load}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
