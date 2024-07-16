import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import { SafeAreaView, Text, View, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../utils/colors";
import InputField from "../../../components/InputField";
import PasswordInputField from "../../../components/PasswordInputField";
import CustomButton from "../../../components/CustomButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const Profile = () => {
  const navigation = useNavigation();
  const [verifyState, setVerifyState] = useState("");
  return (
    <AnimatePresence>
      <SafeAreaView
        style={{
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
          flex: 1,
          minHeight: "100%",
          position: "relative",
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <MotiView
          from={{ opacity: 0 }}
          animate={{
            opacity: 1,
            backgroundColor: "#fff",
            flex: 1,
            position: "relative",
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            delay: 200,
          }}
        >
          <KeyboardAwareScrollView>
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: "3%",
                minWidth: "100%",
                justifyContent: "space-between",
              }}
            >
              <Ionicons
                onPress={() => navigation?.goBack()}
                name={"chevron-back"}
                size={20}
              />
            </View>
            <View
              style={{
                paddingHorizontal: "3%",
                minWidth: "100%",
                marginTop: 26,
              }}
            >
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: "500",
                  fontSize: 16,
                  marginBottom: 23,
                }}
              >
                My profile
              </Text>

              <View>
                <InputField
                  label="Full name"
                  onChange={() => {}}
                  placheHolder="John Doe"
                />
              </View>
              <View
                style={{
                  marginTop: 23,
                }}
              >
                <InputField
                  keyType={"email-address"}
                  label="Email"
                  onChange={() => {}}
                  placheHolder="example@gmail.com"
                />
              </View>
              <View
                style={{
                  marginTop: 23,
                }}
              >
                <PasswordInputField
                  label="Password"
                  placheHolder={"************"}
                />
              </View>
              <View
                style={{
                  marginTop: 23,
                  position: "relative",
                }}
              >
                <InputField
                  label="BVN"
                  keyType={"numeric"}
                  onChange={() => {}}
                  placheHolder="32415908765"
                />

                {verifyState === "" && (
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontWeight: "500",
                      fontSize: 12,
                      marginBottom: 23,
                      fontStyle: "italic",
                      position: "absolute",
                      right: 5,
                      bottom: -40,
                    }}
                  >
                    Tap to Verify
                  </Text>
                )}
                <View
                  style={{
                    marginBottom: 0,
                    position: "absolute",
                    right: 6,
                    bottom: 2,
                  }}
                >
                  <CustomButton
                    label={
                      verifyState === ""
                        ? "Verify"
                        : verifyState === "verified"
                        ? "Verified"
                        : "Try again"
                    }
                    style={{
                      paddingHorizontal: 18,
                      paddingVertical: 5,
                      height: 42,
                      backgroundColor:
                        verifyState === ""
                          ? "#00B796"
                          : verifyState === "verified"
                          ? "#E0FFF9"
                          : "#FFDBDB",
                      borderRadius: 4,
                    }}
                    textStyles={{
                      color:
                        verifyState === ""
                          ? "#fff"
                          : verifyState === "verified"
                          ? "#00B796"
                          : "#FF5050",
                    }}
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
          <View
            style={{
              marginBottom: 0,
              position: "absolute",
              bottom: 20,
              width: "100%",
              paddingHorizontal: "3%",
            }}
          >
            <CustomButton label={"Update Profile"} />
          </View>
        </MotiView>
      </SafeAreaView>
    </AnimatePresence>
  );
};

export default Profile;
