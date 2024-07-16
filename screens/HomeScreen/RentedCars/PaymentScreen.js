import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import tw from "twrnc";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import VeculAppLoader from "../../../components/VeculAppLoader";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";
import useToast from "../../../hooks/useToast";
import {
  bookingCarOwnersAccountApi,
  bookingVerifyPaymentApi,
  extendRentalApi,
} from "../../../services/bookingService";
import {
  calculateBookingsApi,
  createBookingApi,
} from "../../../services/coreService";
import { authSelector } from "../../../store/appSlice";
import { currencyPipe, generateRandomString } from "../../../utils";
import { COLORS } from "../../../utils/colors";
import ScreenWrapper from "../../ScreenWrapper";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const userStore = useSelector(authSelector);
  const carData = useRoute().params?.carData;
  const tripTime = useRoute().params?.tripTime;
  const { toast } = useToast();
  const { copyHook } = useCopyToClipboard();
  const [load, setLoad] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [load2, setLoad2] = useState(false);
  const [data, setData] = useState({
    account_holder_name: "",
    account_number: "",
    bank_name: "",
  });

  const loadAccountData = async () => {
    setLoad(true);
    try {
      const res = await bookingCarOwnersAccountApi(
        carData?.sk,
        userStore?.id_token
      );
      if (res?.status === 200) {
        setData(res?.data?.data);
      }
      loadBookingsData();
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  const loadBookingsData = async () => {
    const obj = {
      car_id: carData?.sk,
      start_date: tripTime?.startDate,
      end_date: tripTime?.endDate?.split("-").join("/"),
    };
    try {
      const res = await calculateBookingsApi(
        obj,
        userStore?.id_token,
        +bookingData?.total
      );
      console.log(res, "resbk");
      if (res?.status === 200) {
        setBookingData(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadAccountData();
  }, []);

  console.log(tripTime);
  const sentMoneyFn = async () => {
    setLoad2(true);
    const obj = {
      payment_ref_id: data?.reference, //to be removed.
      car_id: carData?.sk,
      start_date: tripTime?.startDate,
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
        data.account_number,
        userStore?.id_token
      );
      if (res?.status === 200) {
        // navigate to payment success screen if cerify api returns success
        const resBooking = await extendRentalApi(
          { car_id: obj.car_id, end_date: obj.end_date },
          userStore?.id_token
        );

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
      } else {
        toast("error", "Payment verification failed");
      }
      // else toast error
    } catch (error) {
      console.log(error);
    }
    setLoad2(false);
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

      <KeyboardAwareScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
          flex: 1,
          width: "100%",
          position: "relative",
          // flex: 1,
          // paddingBottom: 150,
          // marginBottom: 80,
          paddingHorizontal: "3%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={tw`text-[#101928] mt-18`}>
          Transfer this to the account details below
        </Text>
        <Text style={tw`text-[#000] text-[30px] my-3`}>
          {+bookingData?.total !== NaN && currencyPipe(+bookingData?.total)}
        </Text>

        <View
          style={tw`w-full h-[249px] flex flex-col justify-between bg-[#E4E7EC] rounded-[10px] mx-[3%] mt-4 p-4`}
        >
          {/* <InputField  /> */}
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
            bottom: 40,
            gap: 15,
            marginTop: "auto",
          }}
        >
          <CustomButton
            Icon={<Ionicons size={20} name="arrow-back" />}
            style={{
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
            onPress={() => navigation.goBack()}
          />
          <CustomButton
            style={{
              width: 219,
            }}
            label="I've sent the money"
            onPress={() => {
              sentMoneyFn();
            }}
            loading={load2}
          />
        </View>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
};

export default PaymentScreen;
