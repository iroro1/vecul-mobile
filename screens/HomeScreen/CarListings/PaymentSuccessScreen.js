import { View, Text } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import useToast from "../../../hooks/useToast";
import ScreenWrapper from "../../ScreenWrapper";
import { authSelector } from "../../../store/appSlice";
import LottieView from "lottie-react-native";
import tw from "twrnc";
import CustomButton from "../../../components/CustomButton";
const PaymentSuccessScreen = () => {
  const navigation = useNavigation();
  const userStore = useSelector(authSelector);
  const bookingData = useRoute().params?.bookingData;
  const carData = useRoute().params?.carData;
  const tripTime = useRoute().params?.tripTime;
  const obj = useRoute().params?.obj;
  const { toast } = useToast();

  console.log(carData, bookingData, tripTime);
  return (
    <ScreenWrapper>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: 167, height: 167 }}>
          <LottieView
            loop={false}
            autoPlay
            style={{
              width: 167,
              height: 167,
            }}
            source={require("../../../assets/lottie/succesStoreCreation.json")}
            // autoPlay
          />
        </View>
        <Text style={tw`text-[#000] text-[30px] my-3 w-full text-center`}>
          Success
        </Text>
        <Text style={tw`text-[#101928] mt-1 text-center w-[70%] leading-5`}>
          Your ride has been booked. You will get an order confirmation soon.
        </Text>

        <View
          style={tw`w-[90%] min-h-[169px] flex flex-col justify-between bg-[#E4E7EC] rounded-[10px] mx-[3%] mt-4 p-4`}
        >
          {/* <InputField  /> */}
          <View
            style={tw`relative flex flex-row items-center justify-between `}
          >
            <Text style={tw`text-[#667185]`}>Reference no</Text>
            <Text
              style={tw`text-[#101928] mt-2 text-[14px] w-[50%] text-right`}
            >
              {obj?.payment_ref_id}
            </Text>
          </View>
          <View
            style={tw`relative flex flex-row items-center justify-between `}
          >
            <Text style={tw`text-[#667185]`}>Total amount</Text>
            <Text
              style={tw`text-[#101928] mt-2 text-[14px] w-[50%] text-right`}
            >
              {bookingData?.total}
            </Text>
          </View>
          <View
            style={tw` relative flex flex-row items-center justify-between`}
          >
            <Text style={tw`text-[#667185]`}>Start date</Text>
            <Text
              style={tw`text-[#101928] mt-2 text-[14px] w-[50%] text-right`}
            >
              {tripTime?.startDate}
            </Text>
          </View>
          <View
            style={tw` relative flex flex-row items-center justify-between`}
          >
            <Text style={tw`text-[#667185]`}>End date</Text>
            <Text
              style={tw`text-[#101928] mt-2 text-[14px] w-[50%] text-right`}
            >
              {tripTime?.endDate}
            </Text>
          </View>
        </View>
      </View>

      <CustomButton
        style={{
          width: "90%",
          marginHorizontal: "auto",
        }}
        label="Go to rentals"
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "RentedCars" }],
          });
        }}
      />
    </ScreenWrapper>
  );
};

export default PaymentSuccessScreen;
