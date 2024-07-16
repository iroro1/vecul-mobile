import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import tw from "twrnc";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import TextCustom from "../../../components/TextCustom";
import VeculAppLoader from "../../../components/VeculAppLoader";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";
import useToast from "../../../hooks/useToast";
import {
  bookingCarOwnersAccountApi,
  bookingVerifyPaymentApi,
} from "../../../services/bookingService";
import { createBookingApi } from "../../../services/coreService";
import { authSelector } from "../../../store/appSlice";
import { currencyPipe, delayFn } from "../../../utils";
import { COLORS } from "../../../utils/colors";
import ScreenWrapper from "../../ScreenWrapper";
// import Paystack from "paystack-react-native";
import { Paystack } from "react-native-paystack-webview";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const userStore = useSelector(authSelector);
  const bookingData = useRoute().params?.bookingData;
  const carData = useRoute().params?.carData;
  const tripTime = useRoute().params?.tripTime;
  const { toast } = useToast();
  const { copyHook } = useCopyToClipboard();
  const [load, setLoad] = useState(false);
  const [timer, setTimer] = useState(0);
  const [load2, setLoad2] = useState(false);
  const [data, setData] = useState({
    account_holder_name: "",
    account_number: "",
    bank_name: "",
  });
  const [paystackModal, setPaystackModal] = useState(false);
  const [settlModal, setSettlModal] = useState(false);

  const loadAccountData = async () => {
    setLoad(true);
    try {
      const res = await bookingCarOwnersAccountApi(
        carData?.sk,
        userStore?.id_token,
        +bookingData?.total
      );
      if (res?.status === 200) {
        setData(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  useEffect(() => {
    setTimer(0);
    loadAccountData();
  }, []);
  useEffect(() => {
    if (timer > 3) {
      toast(
        "error",
        "Payment verification failed",
        "Expect reversal of funds shortly."
      );
      setLoad2(false);
      clearTimeout();
    }
  });
  console.log(timer, "time", bookingData);
  const sentMoneyFn = async (ref) => {
    setLoad2(true);
    const obj = {
      payment_ref_id: ref || data?.reference, //to be removed.
      car_id: carData?.sk,
      start_date: tripTime?.startDate.split("-").join("/"),
      end_date: tripTime?.endDate.split("-").join("/"),
      overview: {
        price_per_day: bookingData?.price_per_day,
        trip_duration: bookingData?.trip_duration,
        insurance: bookingData?.insurance,
        cumulative_insurance: bookingData?.cumulative_insurance,
        service_charge: bookingData?.service_charge,
        total: bookingData?.total,
      },
    };
    try {
      // call verifyapi
      const res = await bookingVerifyPaymentApi(
        ref || data?.reference,
        userStore?.id_token
      );
      console.log(res, "resVwerify");

      if (res?.status === 200) {
        // navigate to payment success screen if cerify api returns success
        const resBooking = await createBookingApi(obj, userStore?.id_token);
        console.log(resBooking, "rbooking");
        if (resBooking?.status === 200) {
          toast("success", "Booking created successfully");
          navigation.navigate("PaymentSuccessScreen", {
            carData,
            bookingData,
            tripTime,
            obj,
          });
        }
        setLoad2(false);
      } else if (res?.response?.status == 404) {
        setTimer((prev) => prev + 1);
        delayFn(() => {
          sentMoneyFn();
        }, 30000);
      } else {
        toast(
          "error",
          "Payment verification failed",
          "Expect reversal of funds shortly."
        );
      }
      // else toast error
    } catch (error) {
      console.log(error);
      setLoad2(false);
    }
    // setLoad2(false);
  };

  const copyFn = async (content) => {
    try {
      await copyHook(content);
      toast("success", "Copied to clipboard successfully.", 2000);
    } catch (error) {
      console.error(error);
    }
  };
  return load ? (
    <VeculAppLoader />
  ) : (
    <ScreenWrapper>
      <Modal style={{ flex: 1 }} visible={paystackModal} animationType="slide">
        <View style={{ flex: 1, marginHorizontal: 20, marginTop: 100 }}>
          <Paystack
            paystackKey="pk_test_20d978ab691f3da814e3ba15a1bb2c5a79844f90"
            amount={bookingData?.total}
            billingEmail={userStore?.email}
            activityIndicatorColor="green"
            onCancel={(e) => {
              // handle response here
              setPaystackModal(false);
            }}
            onSuccess={(res) => {
              // handle response here
              if (res.status === "success") {
                {
                  sentMoneyFn(res?.transactionRef?.reference);
                }
              }
              console.log(res);
              setPaystackModal(false);
            }}
            autoStart={paystackModal}
          />
        </View>
      </Modal>
      {!settlModal && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            marginBottom: 30,
            marginHorizontal: "3%",
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
            Payment Screen
          </Text>
        </View>
      )}

      <KeyboardAwareScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          flex: 1,
          width: "100%",
          position: "relative",
          paddingHorizontal: Platform.OS === "ios" ? "3%" : "0%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <TextCustom style={tw`text-[#000] text-[30px] my-3`}>
          {currencyPipe(+bookingData?.total)}
        </TextCustom>
        <TextCustom style={tw`text-[#101928] text-center w-[70%]`}>
          Transfer the <Text style={tw`font-bold`}>exact amount above</Text> to
          the account details below
        </TextCustom>
        {!settlModal && (
          <View
            style={tw`w-full  flex flex-col justify-between rounded-[10px] mx-[3%] mt-0 p-4`}
          >
            <TouchableOpacity
              disabled={load2}
              style={tw`w-full h-[60px] relative border border-[#D0D5DD] rounded-[10px] flex items-center justify-center rounded-[10px]  mt-4 p-4`}
              onPress={() => !load2 && setPaystackModal(true)}
            >
              <Image
                style={tw`w-[120px] h-[100%] object-contain mr-8`}
                source={require("../../../assets/icons/paystack.png")}
              />
              <View
                style={[
                  tw`absolute right-1  p-1 rounded-full transform rotate-[90deg]`,
                  { backgroundColor: "tomato" },
                ]}
              >
                <Text style={tw`text-white text-[10px]`}>Recommended</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {settlModal ? (
          <View style={tw`absolute w-full top-0 left-0 h-full bg-white`}>
            <View
              style={tw`w-full  flex flex-col justify-between items-center mx-[3%] p-4`}
            >
              <TextCustom style={tw`text-[#000] text-[30px] my-3`}>
                {currencyPipe(+bookingData?.total)}
              </TextCustom>
              <TextCustom style={tw`text-[#101928] text-center w-[70%]`}>
                Transfer the{" "}
                <Text style={tw`font-bold`}>exact amount above</Text> to the
                account details below
              </TextCustom>
            </View>
            <View
              style={tw`w-full h-[249px] flex flex-col justify-between bg-[#E4E7EC] rounded-[10px] mx-[3%] mt-4 p-4`}
            >
              <View style={tw`relative`}>
                <Text style={tw`text-[#667185]`}>Bank name</Text>
                <Text style={tw`text-[#101928] mt-2 text-[14px]`}>
                  {data.bank_name}
                </Text>

                <Ionicons
                  style={tw`absolute right-0 top-4`}
                  name="copy-outline"
                  size={16}
                  color={COLORS.primary}
                  onPress={() => copyFn(data.bank_name)}
                />
              </View>
              <View style={tw`mt-4 relative`}>
                <Text style={tw`text-[#667185]`}>Account number</Text>
                <Text style={tw`text-[#101928] mt-2 text-[14px]`}>
                  {data.account_number}
                </Text>
                <Ionicons
                  style={tw`absolute right-0 top-4`}
                  name="copy-outline"
                  size={16}
                  color={COLORS.primary}
                  onPress={() => copyFn(data.account_number)}
                />
              </View>
              <View style={tw`mt-4 relative`}>
                <Text style={tw`text-[#667185]`}>Account holder</Text>
                <Text style={tw`text-[#101928] mt-2 text-[14px]`}>
                  {data.account_holder_name}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                bottom: 10,
                gap: 15,
                marginTop: "auto",
              }}
            >
              <CustomButton
                Icon={<Ionicons size={20} name="arrow-back" />}
                style={{
                  height: 40,
                  width: 140,
                  borderWidth: 1,
                  borderColor: "#D0D5DD",
                  backgroundColor: "transparent",
                }}
                textStyles={{
                  color: "#000",
                  marginLeft: 6,
                }}
                label="Go Back"
                onPress={() => setSettlModal(false)}
              />
              <CustomButton
                style={{
                  height: 40,
                  width: 219,
                }}
                disabled={load2}
                label="I've sent the money"
                onPress={() => {
                  sentMoneyFn();
                }}
                loading={load2}
              />
            </View>
          </View>
        ) : (
          <View
            style={tw`w-full relative  flex flex-col justify-between rounded-[10px] mx-[3%] mt-0 p-4`}
          >
            <TouchableOpacity
              disabled={load2}
              style={tw`w-full h-[60px] relative border border-[#D0D5DD] rounded-[10px] flex items-center justify-center rounded-[10px]  mt-0 p-4`}
              onPress={() => !load2 && setSettlModal(true)}
            >
              <Text style={tw`text-[#101928] font-bold`}>Pay with Settl</Text>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            bottom: 10,
            gap: 15,
            marginTop: "auto",
            marginBottom: 20,
          }}
        >
          {load2 && (
            <View>
              <Text style={tw`text-[#000] text-center mb-6`}>
                Creating booking, Please wait ...
              </Text>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
};

export default PaymentScreen;
