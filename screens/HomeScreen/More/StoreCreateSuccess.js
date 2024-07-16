import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import tw from "twrnc";
import CustomButton from "../../../components/CustomButton";
import { authSelector } from "../../../store/appSlice";
import { COLORS } from "../../../utils/colors";
import ScreenWrapper from "../../ScreenWrapper";

const StoreCreateSuccess = (props) => {
  const { navigation, route } = props;
  const userStore = useSelector(authSelector);
  console.log(userStore);

  // navigation.navigate("CarAddress");
  return (
    <ScreenWrapper dismissKeyboard={false}>
      <>
        <TouchableOpacity
          style={tw`absolute right-[3%] top-[10px] `}
          onPress={() => navigation.navigate("MoreHome")}
        >
          <Text style={tw`text-[${COLORS.primary}] font-600`}>
            Skip to profile
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: "3%",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            marginTop: 20,
            marginBottom: 30,
            height: "100%",
            flex: 1,
          }}
        >
          <View style={{ width: 318, height: 318 }}>
            <LottieView
              loop={false}
              autoPlay
              style={{
                width: 318,
                height: 318,
              }}
              source={require("../../../assets/lottie/verify.json")}
              // autoPlay
            />
          </View>
          <View
            style={{
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "#101928",
                fontWeight: "600",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Success
            </Text>
            <Text
              style={{
                color: "#344054",
                fontWeight: "400",
                fontSize: 14,
                marginTop: 5,
                textAlign: "center",
                width: "80%",
                marginHorizontal: "auto",
              }}
            >
              Your business details has been saved continue to vehicle listing
            </Text>
          </View>

          {userStore?.hostAccountType === "As individual" ? (
            <>
              <View style={tw`w-full`}>
                <CustomButton
                  style={{
                    width: "100%",
                  }}
                  label="List vehicle manually"
                  IconR={
                    <Ionicons name="arrow-forward" size={16} color={"#fff"} />
                  }
                  onPress={() => navigation.navigate("VehicleAddress")}
                />
                <CustomButton
                  style={{
                    width: "100%",
                    marginTop: 16,
                    backgroundColor: "transparent",
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                  }}
                  textStyles={{
                    color: COLORS.primary,
                  }}
                  label="Bulk listing"
                  IconR={
                    <Ionicons name="arrow-forward" size={16} color={"#fff"} />
                  }
                  onPress={() =>
                    Linking.openURL("https://vecul.co/individuals")
                  }
                />
              </View>
              <Text
                style={{
                  color: "#667185",
                  fontWeight: "400",
                  fontSize: 14,
                  textAlign: "center",
                  width: "80%",
                  marginHorizontal: "auto",
                }}
              >
                Our support team will reach out to you when you select bulk
                listing
              </Text>
            </>
          ) : (
            <>
              <CustomButton
                label="List vehicle"
                IconR={
                  <Ionicons name="arrow-forward" size={16} color={"#fff"} />
                }
                onPress={() => Linking.openURL("https://vecul.co/corporate")}
              />
            </>
          )}
          <Text
            style={{
              color: "#344054",
              fontWeight: "500",
              fontSize: 14,
              marginTop: 5,
              textAlign: "center",
              width: "80%",
              marginHorizontal: "auto",
            }}
          >
            You will get an SMS from settl.me as an account has been created for
            you to use for all transactions on VECUL
          </Text>
        </View>
      </>
    </ScreenWrapper>
  );
};

export default StoreCreateSuccess;
