import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import { Platform, Pressable, SafeAreaView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import BackButton from "../../components/BackButton";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import PasswordInputField from "../../components/PasswordInputField";
import useLocalStorage from "../../hooks/useLocalStorage";
import useToast, { toastConfig } from "../../hooks/useToast";
import { signUpApi } from "../../services/authService";
import { SETUP_STARTUP } from "../../store/appSlice";
import { COLORS } from "../../utils/colors";

const AuthScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const urlExternalFn = async (url) => {
    try {
      const result = await WebBrowser.openBrowserAsync(
        url || "https://expo.io"
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const [path, setPath] = useState("signIn");
  const [load, setLoad] = useState(false);
  const [tc, setTC] = useState(false);

  const disableFn = () => {
    if (path === "signIn") {
      if (data.email == "" || data.password == "") {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        data.fullName == "" ||
        data.email == "" ||
        data.password == "" ||
        data.confirmPassword == ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const { toast } = useToast();
  const signUpFn = async () => {
    setLoad(true);
    try {
      const res = await signUpApi({
        first_name: data?.firstName,
        last_name: data?.lastName,
        email: data?.email,
        password: data?.password,
      });
      if (res.status === 200) {
        dispatch(SETUP_STARTUP(data));
        setData({});
        navigation.navigate("Verify", { data });
      } else {
        toast(
          "error",
          "Error",
          JSON.stringify(res?.response?.data?.message),
          2000
        );
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  return (
    <AnimatePresence>
      <SafeAreaView
        style={{
          flex: 1,
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
          <Toast config={toastConfig} visibilityTime={4000} />
        </View>
        <StatusBar style="dark" />
        <BackButton onPress={() => navigation.goBack()} />
        <KeyboardAwareScrollView
          style={{ flex: 1, marginBottom: 20, marginTop: 100 }}
        >
          <MotiView
            from={{ opacity: 0 }}
            animate={{
              opacity: 1,
              paddingHorizontal: "3%",
              paddingTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
                Let's get started! 🚗
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#667185",
                  marginTop: 8,
                }}
              >
                Start renting or listing your card on{" "}
                <Text style={{ color: "#101928", fontWeight: "700" }}>
                  Vecul
                </Text>{" "}
                today!
              </Text>
              {/* 
              <TouchableOpacity
                style={tw`mt-[20px] h-[44px]  rounded-[6px] border border-[#D0D5DD] flex flex-row gap-2 justify-center items-center`}
              >
                <Image
                  style={tw`w-[24px] h-[24px]`}
                  source={require("../../assets/icons/google.png")}
                />
                <Text style={{ fontSize: 14, fontWeight: "500" }}>
                  Continue with Google
                </Text>
              </TouchableOpacity>

              <View style={tw`my-[24px] w-full flex flex-row itcems-center`}>
                <View style={tw`bg-[#D0D5DD] h-[1px] w-full relative`}></View>
                <View
                  style={tw`absolute text-[14px] font-[400] left-[45%] top-[-8px] bg-[#fff] w-[30px] flex-row items-center justify-center`}
                >
                  <Text>or</Text>
                </View>
              </View> */}

              <View style={tw`mt-5`}>
                <InputField
                  label="Email"
                  onChange={(e) => {
                    setData({ ...data, email: e });
                  }}
                  placheHolder="e.g henry@mail.com"
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <InputField
                  label="First Name"
                  onChange={(e) => {
                    setData({ ...data, firstName: e });
                  }}
                  placheHolder="Henry"
                />
                <Text style={tw`text-[#667185] text-[11px] font-400 mt-[4px]`}>
                  Make sure this matches your driver's license
                </Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <InputField
                  label="Last Name"
                  onChange={(e) => {
                    setData({ ...data, lastName: e });
                  }}
                  placheHolder="Ninth"
                />
                <Text style={tw`text-[#667185] text-[11px] font-400 mt-[4px]`}>
                  Make sure this matches your driver's license
                </Text>
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
              <View
                style={{
                  marginTop: 23,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Pressable
                  style={{
                    width: 20,
                    height: 20,
                    borderColor: "#D0D5DD",
                    borderWidth: 1,
                    borderRadius: 4,
                    backgroundColor: tc ? COLORS.primary + "90" : "transparent",
                  }}
                  onPress={() => setTC(!tc)}
                >
                  {tc && <Ionicons size={15} color={"#fff"} name="checkmark" />}
                </Pressable>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: "#101928",
                      fontWeight: "500",
                      fontSize: 14,
                      marginLeft: 5,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "visible",
                    }}
                  >
                    I have read and accepted the{" "}
                  </Text>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "visible",
                    }}
                    onPress={() =>
                      urlExternalFn("https://www.vecul.co/terms-and-conditions")
                    }
                  >
                    <Text
                      style={{
                        color: "#1671D9",
                      }}
                    >
                      Terms and Conditions
                    </Text>
                  </Pressable>
                </View>
              </View>
            </MotiView>
          </MotiView>
        </KeyboardAwareScrollView>
        <View style={tw`absolute w-full bottom-[20px] px-[20px] left-0`}>
          <CustomButton
            disabled={disableFn() || !tc}
            label="Create Account"
            style={{ marginBottom: 0 }}
            onPress={() => signUpFn()}
            loading={load}
          />
        </View>
      </SafeAreaView>
    </AnimatePresence>
  );
};

export default AuthScreen;
