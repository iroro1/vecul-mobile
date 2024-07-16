import { useNavigation } from "@react-navigation/native";
import { AnimatePresence, MotiView } from "moti";
import React, { useRef, useState } from "react";
import {
  Modal,
  SafeAreaView,
  Text,
  View,
  Platform,
  StatusBar,
} from "react-native";
import BackButton from "../../../components/BackButton";
import TimePickertransparent from "../../../components/TimePickertransparent";
import CustomButton from "../../../components/CustomButton";
import InputField from "../../../components/InputField";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { verifyDriversLicenseApi } from "../../../services/verificationService";
import { useSelector } from "react-redux";
import { authSelector } from "../../../store/appSlice";
import Toast from "react-native-toast-message";
import useToast from "../../../hooks/useToast";
import ScreenWrapper from "../../ScreenWrapper";

const DriversLicense = () => {
  const userStore = useSelector(authSelector);
  const { toast } = useToast();
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();
  const mArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const showMonth = (digit) => {
    return mArr[digit - 1];
  };
  const [data, setData] = useState({
    driversId: "",
    dob: "",
    // dateExpiring: "",
  });
  const disabledFn = () => {
    if (
      data?.driversId === "" ||
      // data?.dateExpiring === "" ||
      data?.dob === ""
    )
      return true;
    return false;
  };
  const animation = useRef(null);

  const [submitted, setSubmitted] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const callVerify = async () => {
    setLoad(true);
    const frmtDate = (v) => {
      const yr = v.split(",")[1];
      const dy = v.split(",")[0].split(" ")[0];
      const mn = v.split(",")[0].split(" ")[1];
      const idx = mArr.findIndex((s) => s === mn) + 1;

      const fmt = yr + "/" + idx + "/" + dy;
      return fmt;
    };
    const obj = {
      id_number: data?.driversId,
      dob: frmtDate(data?.dob),
    };
    try {
      const res = await verifyDriversLicenseApi(obj, userStore?.id_token);
      if (res.success) {
        toast("success", res?.data?.message);
        setSubmitted(true);
        dispatch(SET_AUTH_STATE({ ...userStore, license: true }));
      } else {
        if (res?.data?.message === "ID verified") {
          toast("info", "ID Verified", "Your Id is already verified");
        } else {
          toast("error", res?.data?.message);
          setSubmitted(false);
        }
      }
    } catch (error) {
      console.log(error);
      setSubmitted(false);
    }
    setLoad(false);
  };
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

        {/* {confirm && (
          <View
            style={{
              backgroundColor: "#00000099",
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: 199,
                  backgroundColor: "#fff",
                  width: "90%",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: "#101928",
                    textAlign: "left",
                    fontSize: 18,
                    marginTop: 4,
                    fontWeight: "600",
                  }}
                >
                  Confirm verification
                </Text>
                <Text
                  style={{
                    color: "#667185",
                    textAlign: "left",
                    fontSize: 14,
                    marginTop: 6,
                  }}
                >
                  Drivers License verification attracts{" "}
                  <Text
                    style={{
                      fontWeight: "800",
                      color: "#101928",
                    }}
                  >
                    ₦50
                  </Text>{" "}
                  charges. Please ensure the provided detail is accurate before
                  continue to avoid repeated charges.
                </Text>
                <View
                  style={{
                    marginHorizontal: "3%",
                    marginTop: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <CustomButton
                    onPress={() => {
                      setSubmitted(false);
                    }}
                    style={{
                      width: "45%",
                      backgroundColor: "transparent",
                      borderWidth: 1,
                      borderColor: "#ccc",
                    }}
                    disabled={load}
                    textStyles={{
                      color: "#000",
                    }}
                    label="Cancel"
                  />
                  <CustomButton
                    disabled={load}
                    onPress={() => {
                      callVerify();
                    }}
                    style={{
                      width: "50%",
                    }}
                    label="Continue"
                  />
                </View>
              </View>
            </View>
          </View>
        )} */}
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
          Driver's License
        </Text>
      </View>
      <View style={{ flex: 1, paddingHorizontal: "3%" }}>
        <View>
          <InputField
            // keyType={"numeric"}
            value={data?.driversId}
            label="ID number"
            placheHolder="1234567890"
            onChange={(e) => setData({ ...data, driversId: e })}
          />
        </View>

        <View
          style={{
            height: 46,
            position: "relative",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#C2C2C2",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <Text
            style={{
              position: "absolute",
              top: -22,
              color: "#101928",
              width: "100%",
            }}
          >
            Date of birth
          </Text>
          <Text
            style={{
              color: data?.dob === "" ? "#98A2B3" : "#101928",
              marginLeft: 8,
              width: "100%",
            }}
          >
            {data?.dob || "Select date"}
          </Text>
          <Ionicons
            name="calendar-outline"
            size={16}
            style={{ position: "absolute", right: 8 }}
          />

          <View
            style={{
              opacity: 0,
              position: "absolute",
              backgroundColor: "red",
              width: "100%",
              zIndex: 100,
            }}
          >
            <TimePickertransparent
              dateFn={(e) => {
                const dobIos =
                  e.split("/")[1] +
                  " " +
                  showMonth(e.split("/")[0]) +
                  ", " +
                  e.split("/")[2];
                const dobAnd =
                  e.split("/")[0] +
                  " " +
                  showMonth(e.split("/")[1]) +
                  ", " +
                  e.split("/")[2];
                console.log(dobAnd, e);
                Platform.OS === "android"
                  ? setData({ ...data, dob: dobAnd })
                  : setData({ ...data, dob: dobIos });
              }}
              showLabel
              placeholder={""}
              mode="date"
              value={data?.dob}
            />
          </View>
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
              callVerify();
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default DriversLicense;
