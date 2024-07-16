import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import DropDownBank from "../../../components/DropDownBank";
import InputField from "../../../components/InputField";
import LottieView from "lottie-react-native";
import { delayFn } from "../../../utils";
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "../../ScreenWrapper";

const AddAccountHost = (props) => {
  const { navigation } = props;
  const [data, setData] = useState({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
  });
  const [loadV, setLoadV] = useState(false);
  const disableFn = () => {
    if (
      data?.accountHolder === "" ||
      data?.accountNumber === "" ||
      data?.bankName === ""
    )
      return true;
    return false;
  };
  return (
    <ScreenWrapper dismissKeyboard={false}>
      <Modal visible={loadV} transparent onDismiss={() => setLoadV(false)}>
        <Pressable
          style={{
            backgroundColor: "#00000098",
            flex: 1,
            justifyContent: "center",
            // position: "absolute",
            // top: 0,
            // left: 0,
            // minHeight: "100%",
            // width: "100%",
          }}
          onPress={() => setLoadV(false)}
        >
          <View
            style={{
              minHeight: 163,
              backgroundColor: "#fff",
              marginHorizontal: "3%",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              width: "94%",
              zIndex: 99,
            }}
          >
            {!data?.notFound && (
              <>
                <LottieView
                  source={require("../../../assets/lottie/searchBank.json")}
                  autoPlay
                  loop
                  style={{
                    height: 48,
                    width: 48,
                  }}
                />
                <Text
                  style={{
                    color: "#1F1F1F",
                    fontWeight: "800",
                    marginTop: 30,
                  }}
                >
                  Searching for account
                </Text>
              </>
            )}
            {data?.notFound && (
              <>
                <View
                  style={{
                    backgroundColor: "#FEF6E7",
                    height: 48,
                    width: 48,
                    borderRadius: 24,
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../../assets/moreIcons/caution.png")}
                    height={30}
                    width={30}
                  />
                </View>
                <Text
                  style={{
                    color: "#1F1F1F",
                    fontWeight: "800",
                    marginTop: 15,
                  }}
                >
                  Account not found
                </Text>

                <View
                  style={{
                    width: "70%",
                    marginTop: 20,
                  }}
                >
                  <CustomButton
                    onPress={() => {
                      setData({ ...data, notFound: false });
                      setLoadV(false);
                    }}
                    Icon={
                      <Ionicons name="arrow-back" color={"#fff"} size={20} />
                    }
                    label="Go back"
                    style={{
                      height: 38,
                      width: "100%",
                    }}
                  />
                </View>
              </>
            )}
          </View>
        </Pressable>
      </Modal>
      <>
        <View
          style={{
            marginHorizontal: "3%",
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            marginTop: 20,
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
            Add your account details
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: "3%",
          }}
        >
          <>
            <View style={{ flex: 1, marginTop: 20 }}>
              <View>
                <DropDownBank
                  value={data?.bankName}
                  sep=""
                  label="Bank name"
                  placheHolder="Select bank"
                  heightDD={70}
                  onChange={(e) => {
                    setData({ ...data, bankName: e });
                  }}
                  textAlign="left"
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <InputField
                  placheHolder="1234567890"
                  label="Account number"
                  keyType={"numeric"}
                  onChange={(e) => {
                    if (e.length >= 10) {
                      // call bank verify api
                      setLoadV(true);
                      delayFn(() => {
                        // error
                        setData({ ...data, notFound: true });
                        // setLoadV(false);
                      }, 5000);
                    } else {
                      setData({ ...data, accountNumber: e });
                    }
                  }}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <InputField
                  label="Account holder"
                  value={data?.accountHolder}
                  disabled={true}
                  bgColor="#F0F2F5"
                />
              </View>
            </View>
          </>

          <View
            style={{
              position: "absolute",
              bottom: 20,
              width: "100%",
              left: "3%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomButton
              disabled={disableFn()}
              onPress={() => {
                navigation.navigate("HostFeatures");
              }}
              label="Add account"
            />
          </View>
        </View>
      </>
    </ScreenWrapper>
  );
};

export default AddAccountHost;
