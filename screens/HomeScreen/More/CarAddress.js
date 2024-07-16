import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import DropDown from "../../../components/DropDown";
import InputField from "../../../components/InputField";
import { ADD_CAR_DATA_CREATE, authSelector } from "../../../store/appSlice";
import { delayFn } from "../../../utils";
import { COLORS } from "../../../utils/colors";
import { stateInNigeria } from "../../../utils/dataList";
import ScreenWrapper from "../../ScreenWrapper";

const CarAddress = (props) => {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const userStore = useSelector(authSelector);
  const [data, setData] = useState({
    address: "",
    city: "",
    postal_code: "",
    state: "abia",
  });
  const [err, setErr] = useState({
    address: false,
    city: false,
    postal_code: false,
    state: false,
  });
  const [load, setLoad] = useState(false);
  const newCarData = useSelector((state) => state?.app?.newCarData);

  const submitAddress = async () => {
    setLoad(true);
    const obj = {
      user_id: userStore?.sub,
      car_address: {
        address: data?.address,
        city: data?.city,
        postal_code: data?.postal_code,
        state: data?.state,
      },
    };
    const carDetail = {
      ...newCarData,
      ...obj,
    };

    // Save to store
    dispatch(ADD_CAR_DATA_CREATE(carDetail));

    // Save to local Store
    setterAuth(carDetail);
    delayFn(() => {
      navigation.navigate("AddCarDetails");
    }, 2000);
    setLoad(false);
  };

  return (
    <ScreenWrapper dismissKeyboard={true}>
      <View
        style={{
          marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",
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
          Car address
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          position: "relative",
          flex: 1,
          paddingBottom: 150,
          paddingHorizontal: "3%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <InputField
            label="Address"
            placheHolder="Address"
            onChange={(e) => setData({ ...data, address: e })}
            onBlur={() => {
              if (data?.address === "") {
                setErr({ ...err, address: true });
              } else {
                setErr({ ...err, address: false });
              }
            }}
          />
          {err.address && (
            <Text
              style={{
                color: COLORS.red,
              }}
            >
              Address cannot be empty
            </Text>
          )}
        </View>
        <View style={{ marginTop: 20 }}>
          <InputField
            label="City"
            placheHolder="City"
            onChange={(e) => setData({ ...data, city: e })}
            onBlur={() => {
              if (data?.city === "") {
                setErr({ ...err, city: true });
              } else {
                setErr({ ...err, city: false });
              }
            }}
          />
          {err.city && (
            <Text
              style={{
                color: COLORS.red,
              }}
            >
              City cannot be empty
            </Text>
          )}
        </View>
        <View style={{ marginTop: 20 }}>
          <InputField
            label="Postal code"
            placheHolder="Postal code"
            onChange={(e) => setData({ ...data, postal_code: e })}
            onBlur={() => {
              if (data?.postal_code === "") {
                setErr({ ...err, postal_code: true });
              } else {
                setErr({ ...err, postal_code: false });
              }
            }}
          />
          {err.postal_code && (
            <Text
              style={{
                color: COLORS.red,
              }}
            >
              Postal code cannot be empty
            </Text>
          )}
        </View>
        <View style={{ marginTop: 20 }}>
          <DropDown
            RIcon={<Ionicons name="chevron-down" />}
            label="State"
            placheHolder="Select state"
            data={stateInNigeria}
            value={data?.state}
            onChange={(e) => {
              setData({ ...data, state: e });
            }}
          />
        </View>
      </View>
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
            (data?.address === "") | (data?.city === "") ||
            data?.postal_code === "" ||
            data?.state === ""
          }
          onPress={() => {
            submitAddress();
          }}
          loading={load}
          label="Next"
          IconR={<Ionicons name="arrow-forward" size={20} color={"#fff"} />}
        />
      </View>
    </ScreenWrapper>
  );
};

export default CarAddress;
