import { Ionicons } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";
import CustomButton from "../../../components/CustomButton";
import InputField from "../../../components/InputField";
import Stars from "../../../components/Stars";
import TimePickerCustom from "../../../components/TimePickerCustom";
import { getCarByIdApi } from "../../../services/coreService";
import { COLORS } from "../../../utils/colors";
import ScreenWrapper from "../../ScreenWrapper";

const RentCar = (props) => {
  const { navigation, route } = props;
  const dt = route.params.data;
  const userStore = useSelector((state) => state?.app?.authState?.userResponse);
  const [modal, setModal] = useState("");
  const [data, setData] = useState(dt);
  const [load, setLoad] = useState(false);

  const loadDetail = async () => {
    setLoad(true);
    try {
      const res = await getCarByIdApi(
        {
          car_id: dt?.sk,
        },
        userStore?.id_token
      );

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
  const toast = useToast();
  const rentFn = () => {
    toast.show(data?.car_name + " rented", {
      type: "success",
    });
  };

  console.log(data, 11);
  return (
    <ScreenWrapper dismissKeyboard={false}>
      <Modal visible={modal !== ""} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            padding: "3%",
          }}
        >
          <Ionicons
            onPress={() => setModal("")}
            name="close"
            color={"#fff"}
            size={30}
            style={{
              marginTop: 30,
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "400",
              marginTop: 20,
            }}
          >
            {data?.car_name}
          </Text>
          <Swiper
            style={{
              marginTop: 80,
              height: 300,
              backgroundColor: "#000",
            }}
            showsButtons={false}
            loop
            showsPagination={false}
          >
            {data?.car_pictures.map((item, i) => (
              <Pressable key={i}>
                <Image
                  style={{
                    height: 263,
                    width: "100%",
                    resizeMode: "cover",
                  }}
                  src={item}
                />
              </Pressable>
            ))}
          </Swiper>
        </View>
      </Modal>

      <View
        style={{
          height: 263,
          marginBottom: 16,
        }}
      >
        <Ionicons
          name="arrow-back-circle"
          size={29}
          color="navy"
          style={{
            position: "absolute",
            zIndex: 10,
            top: 16,
            left: 15,
          }}
          onPress={() => navigation.goBack()}
        />

        <Swiper
          style={{
            height: 263,
          }}
          showsButtons={false}
          loop
          showsPagination={false}
        >
          {data?.car_pictures.map((item, i) => (
            <Pressable
              onPress={() => (modal === "" ? setModal(item) : setModal(""))}
              key={i}
            >
              <Image
                style={{
                  height: 263,
                  width: "100%",
                  resizeMode: "cover",
                }}
                src={item}
              />
            </Pressable>
          ))}
        </Swiper>
      </View>

      <ScrollView
        style={{
          width: "100%",
          position: "relative",
          flex: 1,
          paddingBottom: 150,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            marginVertical: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: "3%",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Text
            style={{
              color: "#383838",
              fontSize: 13,
              fontWeight: "500",
              textAlign: "center",
              position: "absolute",
              left: 8,
              fontFamily: "Poppins_400Regular",
            }}
          >
            {data?.car_name}
          </Text>
          {data?.car_availabilty === "yes" ? (
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: 10,
                position: "absolute",
                right: 10,
                borderColor:
                  data?.car_availabilty === "yes" ? COLORS.green : COLORS.red,
                borderWidth: 1,
                backgroundColor:
                  data?.car_availabilty === "yes"
                    ? COLORS.green + "20"
                    : COLORS.red + "20",
              }}
            >
              <Text
                style={{
                  fontSize: 9,
                  fontWeight: "400",
                  color:
                    data?.car_availabilty === "yes" ? COLORS.green : COLORS.red,
                }}
              >
                Available
              </Text>
            </View>
          ) : (
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: 10,
                position: "absolute",
                right: 10,
                borderColor:
                  data?.car_availabilty === "yes" ? COLORS.green : COLORS.red,
                borderWidth: 1,
                backgroundColor:
                  data?.car_availabilty === "yes"
                    ? COLORS.green + "20"
                    : COLORS.red + "20",
              }}
            >
              <Text
                style={{
                  fontSize: 9,
                  fontWeight: "400",
                  color:
                    data?.car_availabilty === "yes" ? COLORS.green : COLORS.red,
                }}
              >
                Not Available
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: "3%",
            alignItems: "center",
            position: "relative",
          }}
        >
          <View style={{ marginLeft: -5 }}>
            <Stars rating={4.3} size={15} />
          </View>
          <Text
            style={{
              color: "#383838",
              fontSize: 13,
              fontWeight: "400",
              fontFamily: "Poppins_400Regular",
            }}
          >
            Lagos, Nigeria
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: "2%",
            alignItems: "center",
            position: "relative",
            marginTop: 8,
          }}
        >
          <Text
            style={{
              color: "#3F3D56",
              fontSize: 13,
              fontWeight: "500",
              fontFamily: "Poppins_400Regular",
            }}
          >
            N{data?.price} /day
          </Text>
        </View>
        <Text
          style={{
            color: "#2D2D2D",
            fontSize: 16,
            fontWeight: "600",
            paddingHorizontal: "2%",
            marginTop: 13,
            fontFamily: "Poppins_600SemiBold",
          }}
        >
          Duration
        </Text>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#DADADA",
            marginVertical: 4,
          }}
        ></View>

        <View
          style={{
            marginTop: 33,
            marginHorizontal: "2%",
          }}
        >
          <TimePickerCustom
            placeholder="02/01/2034"
            mode="datetime"
            showLabel="Pickup Date and Time"
            // value={}
            required
            dateFn={(e) => {
              // setData({ ...data, vehicle_registration_due_date: e });
              // setErr({ ...err, vehicle_registration_due_date: false });
            }}
            onBlur={() => {
              // if (data?.vehicle_registration_due_date.length <= 0)
              //   setErr({ ...err, vehicle_registration_due_date: true });
              // else setErr({ ...err, vehicle_registration_due_date: false });
            }}
            // err={err?.vehicle_registration_due_date}
          />
        </View>
        <View
          style={{
            marginTop: 43,
            marginHorizontal: "2%",
          }}
        >
          <TimePickerCustom
            placeholder="02/01/2034"
            mode="datetime"
            showLabel="Dropoff Date and Time"
            // value={}
            required
            dateFn={(e) => {
              // setData({ ...data, vehicle_registration_due_date: e });
              // setErr({ ...err, vehicle_registration_due_date: false });
            }}
            onBlur={() => {
              // if (data?.vehicle_registration_due_date.length <= 0)
              //   setErr({ ...err, vehicle_registration_due_date: true });
              // else setErr({ ...err, vehicle_registration_due_date: false });
            }}
            // err={err?.vehicle_registration_due_date}
          />
        </View>
        <View
          style={{
            marginTop: 23,
            marginHorizontal: "2%",
          }}
        >
          <InputField
            required
            label="Area of use"
            // value={data.car_name}
            onBlur={() => {
              // if (data?.car_name.length <= 0)
              //   setErr({ ...err, car_name: true });
              // else setErr({ ...err, car_name: false });
            }}
            // err={err?.car_name}
            onChange={(e) => {
              // setData({ ...data, car_name: e });
            }}
            placheHolder="E.g Lagos island"
          />
        </View>

        <Text
          style={{
            color: "#2D2D2D",
            fontSize: 16,
            fontWeight: "600",
            paddingHorizontal: "2%",
            marginTop: 13,
            fontFamily: "Poppins_600SemiBold",
          }}
        >
          Rental summary
        </Text>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#DADADA",
            marginVertical: 4,
          }}
        ></View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: "2%",
          }}
        >
          <Text
            style={{
              color: "##383838",
              fontSize: 16,
              fontWeight: "400",
              marginTop: 13,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Duration
          </Text>
          <Text
            style={{
              color: "#2D2D2D",
              fontSize: 16,
              fontWeight: "600",
              marginTop: 13,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            5 days
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: "2%",
            alignItems: "center",
            marginTop: 13,
          }}
        >
          <Text
            style={{
              color: "##383838",
              fontSize: 16,
              fontWeight: "400",
              marginTop: 13,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Coupon (Not available yet)
          </Text>
          <View style={{ width: 118 }}>
            <InputField placheHolder="DC27D7XD" label="" />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: "2%",
          }}
        >
          <Text
            style={{
              color: "##383838",
              fontSize: 16,
              fontWeight: "400",
              marginTop: 13,
              fontFamily: "Poppins_400Regular",
            }}
          >
            KYC Verification charge
          </Text>
          <Text
            style={{
              color: "#2D2D2D",
              fontSize: 16,
              fontWeight: "600",
              marginTop: 13,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            N150
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: "2%",
          }}
        >
          <Text
            style={{
              color: "##383838",
              fontSize: 16,
              fontWeight: "400",
              marginTop: 13,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Total
          </Text>
          <Text
            style={{
              color: "#2D2D2D",
              fontSize: 16,
              fontWeight: "600",
              marginTop: 13,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            N450,000.00
          </Text>
        </View>
        <CustomButton
          style={{
            width: 104,
            height: 44,
            borderRadius: 8,
            marginLeft: "90%",
            marginRight: "2%",
            marginTop: 23,
          }}
          onPress={rentFn}
          label="Rent this car"
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default RentCar;
