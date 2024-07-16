import { Ionicons } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import DropDown from "../../../components/DropDown";
import InputField from "../../../components/InputField";
import { ADD_CAR_DATA_CREATE, authSelector } from "../../../store/appSlice";
import { createCarApi } from "../../../services/coreService";
import { COLORS } from "../../../utils/colors";
import { delayFn } from "../../../utils";
import VeculAppLoader from "../../../components/VeculAppLoader";
import ScreenWrapper from "../../ScreenWrapper";
import useAuth from "../../../hooks/useAuth";
const PriceAvail = (props) => {
  const { navigation, route } = props;
  // 2024-12-31
  const fmtDate = (dt) => {
    return dt.split("/")[2] + "-" + dt.split("/")[0] + "-" + dt.split("/")[1];
  };
  const userStore = useSelector(authSelector);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { setterAuth, userData } = useAuth();
  const [load, setLoad] = useState(false);
  const newCarData = useSelector((state) => state?.app?.newCarData);
  const submitAddress = async () => {
    setLoad(true);
    const obj = {
      ...data,
      car_registration_due_date: fmtDate(data?.car_registration_due_date),
      price: data?.price.split(",").join(""),
      previous_price: data?.previous_price.split(",").join(""),
      car_address: {
        latitude: `${data?.car_address?.latitude}`,
        longitude: `${data?.car_address?.longitude}`,
      },
    };
    try {
      const res = await createCarApi(obj, userStore?.id_token);
      console.log(res, "res", obj);
      if (res.status === 200) {
        dispatch(ADD_CAR_DATA_CREATE({}));
        setterAuth({
          ...userData,
          newCarData: {},
        });
        navigation.reset({
          index: 1,
          routes: [
            {
              name: "MoreHome",
            },
            { name: "HostCarList" },
          ],
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  useEffect(() => {
    setLoad(true);
    delayFn(() => {
      setData({ ...newCarData, car_availabilty: true, price: "" });
      setLoad(false);
    }, 2000);
  }, []);
  return (
    <ScreenWrapper>
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
          Price and availability
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
          <View style={{ marginTop: 20 }}>
            <InputField
              label="Price (per day)"
              placheHolder="# 0.00"
              onChange={(e) => {
                setData({ ...data, price: e });
              }}
              value={data.price}
            />
            {+data.price === 0 && (
              <Text
                style={{
                  color: COLORS.red,
                }}
              >
                Please enter a valid price greater than 0
              </Text>
            )}
          </View>
          <View style={{ marginTop: 20 }}>
            <InputField
              label="Previous Price (optional)"
              placheHolder="# 0.00"
              onChange={(e) => setData({ ...data, previous_price: e })}
              value={data.previous_price}
            />
          </View>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <DropDown
              RIcon={<Ionicons name="chevron-down" />}
              label="Is car available for rent"
              placheHolder="Select option"
              data={["Yes", "No"]}
              onChange={(e) => {
                setData({
                  ...data,
                  car_availabilty: e === "Yes" ? true : false,
                });
              }}
              value={data?.car_availabilty ? "Yes" : "No"}
              heightDD={30}
            />
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
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            paddingHorizontal: "9%",
            marginBottom: 10,
            color: "#667185",
          }}
        >
          By clicking the “Add car” button below, you agree to being a Vecul
          Host and accept our Terms and condition.
        </Text>
        <CustomButton
          onPress={() => {
            submitAddress();
          }}
          label="Add car"
          disabled={data?.price === "" || data?.price === 0 || load}
        />
      </View>
    </ScreenWrapper>
  );
};

export default PriceAvail;
