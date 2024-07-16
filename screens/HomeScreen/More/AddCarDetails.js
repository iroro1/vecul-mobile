import { Ionicons } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import CarPicker from "../../../components/CarPicker";
import CustomButton from "../../../components/CustomButton";
import DropDownBadges from "../../../components/DropDownBadges";
import { delayFn, yearsFn } from "../../../utils";
import InputField from "../../../components/InputField";
import TimePickerCustom from "../../../components/TimePickerCustom";
import TextArea from "../../../components/TextArea";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ADD_CAR_DATA_CREATE } from "../../../store/appSlice";
import { COLORS } from "../../../utils/colors";
import useAuth from "../../../hooks/useAuth";
import cars from "../../../utils/car-list.json";
import DropDownWithSearch from "../../../components/DropDownWithSearch";
import VeculAppLoader from "../../../components/VeculAppLoader";
import ScreenWrapper from "../../ScreenWrapper";
const AddCarDetails = (props) => {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const { userData, setterAuth } = useAuth();

  const carsBrandList = cars.map((cb) => cb?.brand);
  const carModelsFn = () => {
    const arr =
      cars.filter((c) => c.brand === data?.car_brand)[0]?.models || [];
    return [...arr];
  };

  const [data, setData] = useState({
    ...newCarData,
  });
  const [err, setErr] = useState({
    car_model: false,
    car_description: false,
    vin: false,
    car_registration_due_date: false,
    number_plate: false,
  });
  const disabledFn = () => {
    if (
      data?.vin?.length !== 17 ||
      data?.car_registration_due_date === "" ||
      data?.number_plate === "" ||
      data?.car_description === "" ||
      data?.car_model === ""
    )
      return true;

    return false;
  };
  const [load, setLoad] = useState(false);
  const newCarData = useSelector((state) => state?.app?.newCarData);

  const submitAddress = async () => {
    setLoad(true);
    const obj = {
      car_year: data.car_year,
      car_brand: data.car_brand,
      car_model: data.car_model,
      car_description: data.car_description,
      vin: data.vin,
      car_registration_due_date: data.car_registration_due_date,
      number_plate: data.number_plate,
    };
    try {
      // Save to store
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
        navigation.navigate("CarFeatures");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
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
          Vehicle details
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
            <DropDownBadges
              required
              RIcon={<Ionicons name="chevron-down" />}
              label="Vehicle year"
              placheHolder="Select Year"
              data={[...yearsFn(1900).reverse()]}
              onChange={(e) => {
                setData({ ...data, car_year: `${e}` });
              }}
              value={data.car_year}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <DropDownWithSearch
              required
              label="Vehicle brand"
              placheHolder="Select car brand"
              onChange={(e) => {
                setData({ ...data, car_brand: "" });
                delayFn(() => {
                  setData({ ...data, car_brand: e });
                }, 1);
              }}
              RIcon={<Ionicons name="chevron-down" />}
              data={carsBrandList}
              value={data?.car_brand}
              // disabled
            />
          </View>
          <View style={{ marginTop: 20 }}>
            {data?.car_brand === "" ? (
              <InputField
                required
                label="Vehicle model"
                placheHolder="e.g Camry"
                disabled
              />
            ) : (
              <DropDownWithSearch
                required
                label="Vehicle model"
                placheHolder="Select car model"
                onChange={(e) => {
                  setData({ ...data, car_model: e });
                }}
                RIcon={<Ionicons name="chevron-down" />}
                data={carModelsFn()}
                value={data?.car_model}
                disabled={data?.car_brand === ""}
              />
            )}
          </View>
          <View style={{ marginTop: 20, position: "relative" }}>
            <Text
              style={{
                marginBottom: 4,
                fontSize: 14,
              }}
            >
              Vehicle description
            </Text>
            <TextArea
              style={{
                borderWidth: 1,
                borderColor:
                  data?.car_description.length >= 500 ? COLORS.red : "#bbb",
              }}
              maxEntry={500}
              value={data?.car_description}
              placeholder="Mercedez GLE for rental in Lekki Phase 1 2.0L..."
              onBlur={() => {
                if (data?.car_description === "") {
                  setErr({ ...err, car_description: true });
                } else {
                  setErr({ ...err, car_description: false });
                }
              }}
              onchange={(e) => {
                setData({ ...data, car_description: e });
              }}
            />
            {err.car_model && (
              <Text
                style={{
                  color: COLORS.red,
                }}
              >
                Car description cannot be empty
              </Text>
            )}
          </View>
          <View style={{ marginTop: 20 }}>
            <InputField
              required
              maxEntry={17}
              value={data?.vin}
              label="VIN"
              placheHolder="1234567890"
              onChange={(e) => {
                setData({ ...data, vin: e });
                if (e.length !== 17) {
                  setErr({ ...err, vin: true });
                } else {
                  setErr({ ...err, vin: false });
                }
              }}
            />
            {err.vin && (
              <Text
                style={{
                  color: COLORS.red,
                }}
              >
                Vin must be exactly 17 digits
              </Text>
            )}
          </View>
          <View style={{ marginTop: 50 }}>
            <TimePickerCustom
              mode="date"
              required
              value={data?.car_registration_due_date}
              placeholder={"Select date"}
              showLabel="Vehicle registration due date"
              dateFn={(e) => {
                setData({ ...data, car_registration_due_date: e });
                setErr({ ...err, car_registration_due_date: false });
              }}
            />
            {err.car_registration_due_date && (
              <Text
                style={{
                  color: COLORS.red,
                }}
              >
                Vehicle registration due date is required
              </Text>
            )}
          </View>
          <View style={{ marginTop: 20 }}>
            <InputField
              required
              label="Number plate"
              placheHolder="ABC123DEF"
              value={data?.number_plate}
              onChange={(e) => {
                setData({ ...data, number_plate: e });
              }}
              onBlur={() => {
                if (data?.number_plate === "") {
                  setErr({ ...err, number_plate: true });
                } else {
                  setErr({ ...err, number_plate: false });
                }
              }}
            />
            {err.number_plate && (
              <Text
                style={{
                  color: COLORS.red,
                }}
              >
                Number plate cannot be empty
              </Text>
            )}
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
          disabled={disabledFn()}
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

export default AddCarDetails;
