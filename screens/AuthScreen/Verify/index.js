import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";

import Toast from "react-native-toast-message";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import InputField from "../../../components/InputField";
import useLocalStorage from "../../../hooks/useLocalStorage";
import useToast from "../../../hooks/useToast";
import { decodeJwt } from "../../../services";
import {
  confirmAuthApi,
  loginApi,
  resendCodeApi,
} from "../../../services/authService";
import { SET_AUTH_STATE } from "../../../store/appSlice";
import { COLORS } from "../../../utils/colors";

const Verify = () => {
  const store = useSelector((d) => d?.app?.setUpData);
  const route = useRoute();
  const [data, setData] = useState({
    code: "",
    userName: store?.email,
    ...route?.params.data,
  });
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { toast } = useToast();
  const navigation = useNavigation();
  const [err, setErr] = useState({
    code: false,
  });
  const { storeDataObject } = useLocalStorage();
  console.log(route.params, 1);
  const disabled = () => {
    if (data?.code.length < 6) return true;
    else return false;
  };
  const resendOtp = async () => {
    setLoad(true);
    try {
      const res = await resendCodeApi({
        email: data?.email,
      });
      if (res?.status === 200) {
        toast(
          "success",
          "Success",
          "Code sent successfully to your email",
          2000
        );
      } else {
        if (res.data.body.message.includes("user already confirmed")) {
          navigation.navigate("Login");
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  const verifyFn = async () => {
    if (!disabled()) {
      setLoad(true);
      try {
        const res = await confirmAuthApi({
          code: data.code,
          email: data?.email?.toLowerCase(),
        });
        if (res?.status === 200) {
          const resLogin = await loginApi({
            email: data?.email,
            password: data?.password,
          });

          if (+resLogin?.status === 200) {
            const obj = {
              userResponse: {
                ...decodeJwt(resLogin?.data?.data?.id_token),
                ...resLogin?.data?.data,
              },
            };
            storeDataObject("authState", obj);
            storeDataObject("expiredToken", { origin: res?.data?.data });
            dispatch(SET_AUTH_STATE(obj?.userResponse));
            if (
              resLogin?.data?.message.toLowerCase().includes("confirm sign up")
            )
              navigation.push("Verify");
            else if (resLogin?.data?.message === "User is not confirmed.") {
              await resendCodeApi({
                email: data?.userName,
              });
              dispatch(SET_AUTH_STATE(data));
              navigation.push("Verify");
            } else
              navigation.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }],
              });
          } else {
            if (
              res?.response?.data?.message.includes(
                "already confirmed" || "cannot be confirmed"
              )
            ) {
              navigation.navigate("LoginScreen");
            }
            toast(
              "error",
              "Error",
              JSON.stringify(res?.response?.data?.message),
              2000
            );
          }
        } else {
          toast(
            "error",
            "Error",
            JSON.stringify(res?.response?.data?.message),
            2000
          );

          JSON.stringify(res?.response?.data?.message)
            .toLowerCase()
            .includes("current status is confirmed") &&
            navigation.navigate("AuthScreen");
        }
      } catch (error) {
        console.log(error);
      }
      setLoad(false);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.bg,
      }}
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
            Verify your account
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
            Enter the verification code sent to your email and remember to check
            your spam
          </Text>

          <View
            style={{
              gap: 25,
              marginTop: 30,
              marginBottom: 20,
            }}
          >
            <InputField
              placheHolder="123456"
              fs={14}
              onChange={(e) => setData({ ...data, code: e })}
              label="Enter Code"
              borderBottomColor={err.code ? "red" : "#ffffff80"}
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
            onPress={verifyFn}
            w="100%"
            loading={load}
            label="Continue"
            disabled={disabled()}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: 30,
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: "#667185",
              textAlign: "center",
              fontWeight: "400",
              marginRight: 4,
            }}
            allowFontScaling={false}
          >
            Didn't get the code?
          </Text>
          <Pressable onPress={resendOtp}>
            <Text
              style={{
                color: COLORS.primary,
                // marginTop: 8,
                fontWeight: "600",
              }}
              allowFontScaling={false}
            >
              Resend code
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Verify;
