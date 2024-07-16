import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import tw from "twrnc";
import BackButton from "../../../components/BackButton";
import CalendarPicker from "../../../components/CalendarPicker";
import CustomButton from "../../../components/CustomButton";
import VeculAppLoader from "../../../components/VeculAppLoader";
import { getCarByIdApi } from "../../../services/coreService";
import { authSelector } from "../../../store/appSlice";
import { COLORS } from "../../../utils/colors";
import ScreenWrapper from "../../ScreenWrapper";
import useToast from "../../../hooks/useToast";
import { extendCheckApi } from "../../../services/bookingService";
const ExtendRentalScreen = () => {
  const navigation = useNavigation();

  const { tripTime, carData, bookingData } = useRoute().params;
  const userStore = useSelector(authSelector);
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);
  const [tTime, setTTime] = useState({ tripTime });

  const loadDetail = async () => {
    setLoad(true);
    const obj = {
      car_id: carData?.sk,
      user_id: userStore?.sub,
    };
    try {
      const res = await getCarByIdApi(obj, userStore?.id_token);
      console.log(res, "rss");
      if (res?.status === 200) {
        setData(res?.data?.data?.car);
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  useEffect(() => {
    loadDetail();
  }, []);
  const { toast } = useToast();

  const getDatesBetween = (startDate, endDate) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    // Array to hold the dates
    let dates = [];
    // Iterate from start date to end date
    while (start <= end) {
      // Push the current date to the array in 'YYYY-MM-DD' format
      dates.push(new Date(start).toISOString().split("T")[0]);

      // Increment the date by one day
      start.setDate(start.getDate() + 1);
    }

    return dates;
  };

  const [bkDates, setBkDates] = useState({});
  const [tempBkDates, setTempBkDates] = useState({});
  let booking_dates = {};
  const plain_booking_dates = [];

  const formatToBook = (c) => {
    const obj = {};
    obj[c] = {
      marked: true,
      color: COLORS.primary,
      textColor: "#fff",
      dotColor: "#fff",
      startingDay: false,
      endingDay: true,
      disableTouchEvent: true,
    };

    return obj;
  };

  data?.booking_dates?.map((c, i) => {
    let d = c.split("/")[0] + "-" + c.split("/")[1] + "-" + c.split("/")[2];
    plain_booking_dates.push(d);
    booking_dates[d] = {
      marked: true,
      color: "#ffffff",
      textColor: "#bbb",
      dotColor: "#ee0000",
      startingDay: i === 0 && true,
      endingDay: i === data?.booking_dates.length - 1 && true,
      disableTouchEvent: true,
    };
  });

  useEffect(() => {
    if (Object.entries(bkDates).length === 0) {
      setBkDates(booking_dates);
      setTempBkDates(booking_dates);
    }
  }, [data?.booking_dates]);

  console.log(tempBkDates, "tempBkDates", Object.entries(bkDates).length);
  return (
    <ScreenWrapper>
      <View
        style={{
          marginHorizontal: "3%",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
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
          Select extension date
        </Text>
      </View>
      {load ? (
        <VeculAppLoader />
      ) : (
        <View
          style={{
            flex: 1,
            padding: "3%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              position: "relative",
              backgroundColor: "#fff",
              borderRadius: 6,
              flex: 1,
            }}
          >
            <View
              style={tw`absolute top-[15px] pr-2 flex-row justify-between w-full rounded-full left-[15px] z-99`}
            >
              <TouchableOpacity
                onPress={() => {
                  setBkDates(tempBkDates);
                  setTTime({});
                }}
                style={tw`flex-row items-center gap-1 animate`}
              >
                <Ionicons name="refresh-sharp" color={"navy"} size={20} />
              </TouchableOpacity>
            </View>
            <CalendarPicker
              disabledRange={[]}
              onSelect={async (e) => {
                try {
                  const res = await extendCheckApi(
                    {
                      car_id: carData?.sk,
                      start_date: tripTime?.end_date,
                      end_date: e.split("-").join("/"),
                    },
                    userStore?.id_token
                  );
                  console.log(res, "extendCheckApi");
                  if (res?.status === 200) {
                    //
                    const chk = Object.keys(bkDates).filter(
                      (c) => c === tripTime?.end_date?.split("/").join("-")
                    );
                    if (chk?.length === 0) {
                      return;
                    }

                    const datesBtw = getDatesBetween(
                      tripTime?.end_date?.split("/").join("-"),
                      e
                    );
                    datesBtw.shift();
                    const obj = {};
                    datesBtw?.map((c, i) => {
                      obj[c] = {
                        marked: true,
                        color: i === 0 ? COLORS.primary : COLORS.lightGrey,
                        textColor: i === 0 ? "#fff" : "#333",
                        dotColor: COLORS.primary,
                        disableTouchEvent: true,
                        startingDay: i === 0 ? true : false,
                        endingDay: false,
                      };
                    });
                    const r = formatToBook(e, "end");
                    console.log(r, "r");
                    setBkDates({ ...bkDates, ...obj, ...r });

                    setTTime({
                      startDate: tripTime?.end_date,
                      endDate: e,
                    });
                  } else {
                    toast(
                      "error",
                      res?.response?.data?.message.toString().slice(0, 45),
                      res?.response?.data?.message.toString().slice(45, 3000),
                      3000
                    );
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
              disabledDaysIndexes={[0, plain_booking_dates.length - 1]}
              markedDates={bkDates || booking_dates}
              stylesCont={{
                width: "100%",
                height: "100%",
                marginTop: 90,
              }}
            />
          </View>
        </View>
      )}
      <View style={{ padding: "3%" }}>
        <CustomButton
          label="Continue to payment"
          onPress={() => {
            navigation.navigate("PaymentScreen", {
              carData: data,
              bookingData: bookingData,
              tripTime: tTime,
            });
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default ExtendRentalScreen;
