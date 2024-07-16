import { useNavigation } from "@react-navigation/native";
import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import BackButton from "../../../components/BackButton";
import InputField from "../../../components/InputField";
import TimePickertransparent from "../../../components/TimePickertransparent";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton";
import LottieView from "lottie-react-native";
import { verifyNinApi } from "../../../services/verificationService";
import { useDispatch, useSelector } from "react-redux";
import { SET_AUTH_STATE, authSelector } from "../../../store/appSlice";
import Toast from "react-native-toast-message";
import useToast from "../../../hooks/useToast";
import ScreenWrapper from "../../ScreenWrapper";

const BVN = () => {
  const navigation = useNavigation();
  const userStore = useSelector(authSelector);
  const [data, setData] = useState({ nin: "" });
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { toast } = useToast();
  const disabledFn = () => {
    if (data?.nin === "") return true;
    return false;
  };
  const animation = useRef(null);

  const submitFn = async () => {
    setLoad(true);
    try {
      const res = await verifyNinApi(
        {
          id_number: data.nin,
        },
        userStore?.id_token
      );
      if (res?.status === 200) {
        //
        toast("success", res?.data?.message);
        setSubmitted(true);
        dispatch(SET_AUTH_STATE({ ...userStore, nin: true }));
      } else {
        if (res?.data?.message === "ID verified") {
          toast("info", "ID Verified", "Your Id is already verified");
        } else {
          toast("error", res?.data?.message || res?.response?.data?.message);
          setSubmitted(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  // 40998487553
  return (
    <ScreenWrapper>
      <Modal visible={submitted} transparent animationType="slide">
        {submitted && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <LottieView
              loop={false}
              autoPlay
              ref={animation}
              style={{
                width: 327,
                height: 327,
              }}
              // Find more Lottie files at https://lottiefiles.com/featured
              source={require("../../../assets/lottie/verify.json")}
            />

            <View>
              <Text
                style={{
                  color: "#101928",
                  textAlign: "center",
                  width: 269,
                  fontSize: 18,
                  marginTop: 4,
                  fontWeight: "600",
                }}
              >
                Verification in progress
              </Text>
              <Text
                style={{
                  color: "#667185",
                  textAlign: "center",
                  width: 269,
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                Verification is in progress, this can take 24 - 48 hours to be
                verified
              </Text>
            </View>
            <View
              style={{
                width: "80%",
                marginHorizontal: "3%",
                marginTop: 40,
              }}
            >
              <CustomButton
                onPress={() => {
                  setSubmitted(false);
                  navigation.goBack();
                }}
                Icon={<Ionicons name="arrow-back" color={"#fff"} size={20} />}
                label="Go back"
              />
            </View>
          </View>
        )}
      </Modal>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          marginTop: 20,
          marginBottom: 30,
          paddingHorizontal: "3%",
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
          NIN verification
        </Text>
      </View>
      <KeyboardAvoidingView style={{ flex: 1, paddingHorizontal: "3%" }}>
        <View>
          <InputField
            keyType={"numeric"}
            label="NIN"
            placheHolder="1234567890"
            onChange={(e) => setData({ ...data, nin: e })}
          />
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 20,
            width: "100%",
            left: "3%",
          }}
        >
          <CustomButton
            disabled={disabledFn()}
            label="Verify"
            loading={load}
            onPress={() => {
              submitFn();
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default BVN;
