import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import DropDown from "../../../components/DropDown";
import InputField from "../../../components/InputField";
import VCheckbox from "../../../components/VCheckbox";
import useAuth from "../../../hooks/useAuth";
import { ADD_CAR_DATA_CREATE } from "../../../store/appSlice";
import { delayFn } from "../../../utils";
import { COLORS } from "../../../utils/colors";
import ScreenWrapper from "../../ScreenWrapper";
import VeculAppLoader from "../../../components/VeculAppLoader";

const CarFeatures = (props) => {
  const { navigation } = props;
  const otherFeatures = [
    { img: require("../../../assets/icons/ac.png"), name: "Air condition" },
    { img: require("../../../assets/icons/aux.png"), name: "Aux input" },
    { img: require("../../../assets/icons/btoot.png"), name: "Bluetooth" },
    {
      img: require("../../../assets/icons/applePlay.png"),
      name: "Apple CarPlay",
    },
    {
      img: require("../../../assets/icons/applePlay.png"),
      name: "Android Auto",
    },
    {
      img: require("../../../assets/icons/usbCharger.png"),
      name: "USB charger",
    },
  ];
  const { setterAuth, userData } = useAuth();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const newCarData = useSelector((state) => state?.app?.newCarData);
  const [data, setData] = useState({
    car_features: {
      air_condition: newCarData?.car_features?.air_condition || false,
      android_auto: newCarData?.car_features?.android_auto || false,
      apple_carplay: newCarData?.car_features?.apple_carplay || false,
      aux_input: newCarData?.car_features?.aux_input || false,
      bluetooth: newCarData?.car_features?.bluetooth || false,
      usb_charger: newCarData?.car_features?.usb_charger || false,
    },
    engine_type: newCarData?.engine_type || "diesel",
    number_of_doors: newCarData?.number_of_doors || 0,
    number_of_seats: newCarData?.number_of_seats || 0,
    transmission: newCarData?.transition || "Automatic",
    comes_with_driver: false,
  });
  const [err, setErr] = useState({
    engine_type: false,
    number_of_doors: false,
    number_of_seats: false,
    transmission: false,
  });
  const submitAddress = async () => {
    setLoad(true);
    const obj = {
      engine_type: data.engine_type.toLowerCase(),
      number_of_doors: +data.number_of_doors,
      number_of_seats: +data.number_of_seats,
      transmission: data.transmission.toLowerCase(),
      comes_with_driver: data?.comes_with_driver,
      car_features: {
        airbags: true,
        air_condition: data?.car_features?.air_condition,
        android_auto: data?.car_features?.android_auto,
        apple_carplay: data?.car_features?.apple_carplay,
        aux_input: data?.car_features?.aux_input,
        bluetooth: data?.car_features?.bluetooth,
        usb_charger: data?.car_features?.usb_charger,
      },
    };
    try {
      dispatch(
        ADD_CAR_DATA_CREATE({
          ...userData?.newCarData,
          ...obj,
        })
      );
      // Save to local Store
      setterAuth({
        ...userData,
        newCarData: {
          ...userData?.newCarData,
          ...obj,
        },
      });

      delayFn(() => {
        navigation.navigate("CarPictures");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  const borderFn = (name) => {
    if (name.includes("Air condition")) {
      return data?.car_features?.air_condition ? true : false;
    } else if (name.includes("Aux input")) {
      return data?.car_features?.aux_input ? true : false;
    } else if (name.includes("Bluetooth")) {
      return data?.car_features?.bluetooth ? true : false;
    } else if (name.includes("Apple CarPlay")) {
      return data?.car_features?.apple_carplay ? true : false;
    } else if (name.includes("Android Auto")) {
      return data?.car_features?.android_auto ? true : false;
    } else if (name.includes("USB charger")) {
      return data?.car_features?.usb_charger ? true : false;
    }
  };
  useEffect(() => {
    setLoad(true);
    delayFn(() => {
      setData(newCarData);
      setLoad(false);
    }, 2000);
  }, []);
  return (
    <ScreenWrapper dismissKeyboard={false}>
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
          Vehicle features
        </Text>
      </View>

      {load ? (
        <VeculAppLoader />
      ) : (
        <KeyboardAwareScrollView
          style={{
            width: "100%",
            position: "relative",
            flex: 1,
            paddingBottom: 150,
            paddingHorizontal: "3%",
            marginBottom: 80,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <DropDown
              RIcon={<Ionicons name="chevron-down" />}
              label="Transmission"
              placheHolder="Select option"
              data={["Automatic", "Manual", "Hybrid"]}
              onChange={(e) => {
                setData({ ...data, transmission: e });
              }}
              value={
                data?.transmission?.includes("utomatic")
                  ? "Automatic"
                  : data?.transmission?.includes("anual")
                  ? "Manual"
                  : "Hybrid"
              }
              heightDD={30}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <InputField
              keyType={"numeric"}
              label="Number of seats"
              placheHolder="2"
              onChange={(e) => {
                setData({ ...data, number_of_seats: e });
              }}
              onBlur={() => {
                if (data?.number_of_seats === "") {
                  setErr({ ...err, number_of_seats: true });
                } else {
                  setErr({ ...err, number_of_seats: false });
                }
              }}
              value={data?.number_of_seats?.toString()}
            />
            {err.number_of_seats && (
              <Text
                style={{
                  color: COLORS.red,
                }}
              >
                Number of seats cannot be empty
              </Text>
            )}
          </View>
          <View style={{ marginTop: 20 }}>
            <InputField
              keyType={"numeric"}
              label="Number of doors"
              placheHolder="4"
              onChange={(e) => {
                setData({ ...data, number_of_doors: e });
              }}
              onBlur={() => {
                if (data?.number_of_doors === "") {
                  setErr({ ...err, number_of_doors: true });
                } else {
                  setErr({ ...err, number_of_doors: false });
                }
              }}
              value={data.number_of_doors?.toString()}
            />
            {err.number_of_doors && (
              <Text
                style={{
                  color: COLORS.red,
                }}
              >
                Number of doors cannot be empty
              </Text>
            )}
          </View>
          <View style={{ marginTop: 20 }}>
            <DropDown
              RIcon={<Ionicons name="chevron-down" />}
              label="Engine type"
              placheHolder="Select option"
              data={["Diesel", "Petrol", "Gas", "Other"]}
              onChange={(e) => {
                setData({ ...data, engine_type: e });
              }}
              value={data.engine_type}
              heightDD={35}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={tw`font-500`}>Select other vehicle features</Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              {otherFeatures.map((itm) => (
                <TouchableOpacity
                  key={itm.name}
                  onPress={() => {
                    if (itm.name.includes("Air condition")) {
                      setData({
                        ...data,
                        car_features: {
                          ...data?.car_features,
                          air_condition: !data?.car_features?.air_condition,
                        },
                      });
                    } else if (itm.name.includes("Aux input")) {
                      setData({
                        ...data,
                        car_features: {
                          ...data?.car_features,
                          aux_input: !data?.car_features?.aux_input,
                        },
                      });
                    } else if (itm.name.includes("Bluetooth")) {
                      setData({
                        ...data,
                        car_features: {
                          ...data?.car_features,
                          bluetooth: !data?.car_features?.bluetooth,
                        },
                      });
                    } else if (itm.name.includes("Apple CarPlay")) {
                      setData({
                        ...data,
                        car_features: {
                          ...data?.car_features,
                          apple_carplay: !data?.car_features?.apple_carplay,
                        },
                      });
                    } else if (itm.name.includes("Android Auto")) {
                      setData({
                        ...data,
                        car_features: {
                          ...data?.car_features,
                          android_auto: !data?.car_features?.android_auto,
                        },
                      });
                    } else if (itm.name.includes("USB charger")) {
                      setData({
                        ...data,
                        car_features: {
                          ...data?.car_features,
                          usb_charger: !data?.car_features?.usb_charger,
                        },
                      });
                    }
                  }}
                  style={[
                    tw`h-[65px] w-[106px] border border-[#D0D5DD] justify-center items-center rounded-[6px] gap-[10px]`,
                    {
                      borderWidth: borderFn(itm.name) ? 2 : 1,
                      borderColor: borderFn(itm.name) ? COLORS.primary : "#aaa",
                    },
                  ]}
                >
                  <Image source={itm.img} />
                  <Text style={tw`font-500 text-[12px]`}>{itm.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={tw`mt-[20px] flex-row gap-2 items-center`}>
            <VCheckbox
              iconSize={20}
              bg={COLORS.primary}
              onPress={(e) => setData({ ...data, comes_with_driver: e })}
              value={data?.comes_with_driver}
            />
            <View>
              <Text style={tw`text-[#101928] text-[12px] font-600`}>
                Vehicle comes with a driver
              </Text>
              <Text style={tw`text-[#667185] text-[12px]`}>
                Select if you will be providing a driver with the vehicle
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
      <View
        style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          left: 0,
          paddingHorizontal: "3%",
        }}
      >
        <CustomButton
          disabled={
            data.engine_type === "" ||
            data.number_of_doors === 0 ||
            data.number_of_seats === 0 ||
            data.transmission === ""
          }
          loading={load}
          onPress={() => {
            submitAddress();
          }}
          label="Next"
          IconR={<Ionicons name="arrow-forward" size={20} color={"#fff"} />}
        />
      </View>
    </ScreenWrapper>
  );
};

export default CarFeatures;
