import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "moti";
import React, { useState } from "react";
import { Platform, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import DropDown from "../../../components/DropDown";
import DropDownBadges from "../../../components/DropDownBadges";
import DropDownWithSearch from "../../../components/DropDownWithSearch";
import { SET_FILTER } from "../../../store/appSlice";
import { delayFn, yearsFn } from "../../../utils";
import { COLORS } from "../../../utils/colors";
import { carListJson } from "../../../utils/dataList";
import ScreenWrapper from "../../ScreenWrapper";
import { fontsPoppins } from "../../../utils/fonts";

const BrandPick = ({ navigation }) => {
  const store = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const initialState = {
    min_price: "₦10,000",
    max_price: "₦3,000,000",
  };
  const [data, setData] = useState({
    ...initialState,
    ...store.filterData,
  });
  const [carModels, setCarModels] = useState([]);

  // const carTypeSelect = () => {
  //   return ["Cargo vans", "Minivans", "Sedans", "SUVs", "Trucks", "Vans"];
  // };
  const carBrandSelect = () => {
    return carListJson.map((itm) => itm.brand);
  };
  const currYr = new Date().getFullYear();
  const filterActiveFn = () => {
    if (
      data?.car_brand?.length > 0 ||
      data?.car_model?.length > 0 ||
      data?.transmission?.length > 0 ||
      data?.max_year?.length > 0 ||
      data?.max_year?.length > 0 ||
      data?.min_year?.length > 0 ||
      data?.min_price?.length > 0 ||
      data?.max_price?.length > 0 ||
      data?.number_of_seats?.length > 0
    )
      return true;

    return false;
  };
  const priceFn = () => {
    return [
      "₦10,000",
      "₦20,000",
      "₦30,000",
      "₦40,000",
      "₦50,000",
      "₦60,000",
      "₦70,000",
      "₦80,000",
      "₦90,000",
      "₦100,000",
      "₦110,000",
      "₦120,000",
      "₦130,000",
      "₦140,000",
      "₦150,000",
      "₦160,000",
      "₦170,000",
      "₦180,000",
      "₦190,000",
      "₦200,000",
      "₦250,000",
      "₦300,000",
      "₦350,000",
      "₦400,000",
      "₦450,000",
      "₦500,000",
      "₦600,000",
      "₦700,000",
      "₦800,000",
      "₦900,000",
      "₦1,000,000",
      "₦1,500,000",
      "₦2,000,000",
      "₦2,500,000",
      "₦3,000,000",
    ];
  };

  return (
    <ScreenWrapper dismissKeyboard={false}>
      <View
        style={{
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginHorizontal: Platform.OS === "ios" ? "3%" : 0,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <BackButton type={2} onPress={() => navigation.goBack()} />
          <Text
            style={{
              color: "#101928",
              fontWeight: "600",
              fontSize: 14,
              fontFamily: fontsPoppins.p4Regular,
            }}
          >
            Filters
          </Text>
        </View>

        <TouchableOpacity
          style={{}}
          onPress={() => {
            setData(initialState);
            dispatch(SET_FILTER({ filterActive: false }));
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              width: 40,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Reset
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginHorizontal: Platform.OS === "ios" ? "3%" : 0,
          flex: 1,
        }}
      >
        <KeyboardAwareScrollView
          style={{
            flex: 1,
          }}
        >
          <View style={{ paddingTop: 30 }}>
            <Text
              style={{
                marginLeft: 2,
                marginBottom: 10,
                fontFamily: fontsPoppins.p7Bold,
              }}
              allowFontScaling={false}
            >
              Daily rental price
            </Text>
            <View style={tw`flex-row items-center justify-between`}>
              <DropDown
                placheHolder={priceFn()[0]}
                data={priceFn()}
                width="45%"
                label="Min price"
                value={data?.min_price}
                onChange={(e) => {
                  const idx = priceFn()?.findIndex((a) => a === e);
                  const idxMax = priceFn()?.findIndex(
                    (a) => a === data?.max_price
                  );
                  setData({
                    ...data,
                    min_price: e,
                    max_price: idxMax <= idx ? e : data?.max_price,
                  });
                }}
              />
              <View style={tw`h-[1px] w-[10px] bg-[#000] mt-[30px]`} />
              <DropDown
                placheHolder={priceFn()[3]}
                data={priceFn()}
                width="45%"
                label="Max price"
                value={data?.max_price}
                onChange={(e) => {
                  const idx = priceFn()?.findIndex((a) => a === e);
                  const idxMin = priceFn()?.findIndex(
                    (a) => a === data?.min_price
                  );
                  setData({
                    ...data,
                    min_price: idxMin >= idx ? e : data?.min_price,
                    max_price: e,
                  });
                }}
              />
            </View>

            <View
              style={{
                borderTopColor: "#E4E7EC",
                borderTopWidth: 1,
                marginBottom: 15,
                marginTop: 15,
              }}
            />

            <View>
              <DropDownWithSearch
                placheHolder="All types"
                label="Car brand"
                RIcon={
                  <Ionicons name="chevron-down" size={20} color={"#667185"} />
                }
                value={data?.car_brand}
                onChange={(val) => {
                  if (!val.includes("All Types")) {
                    const carBrand = val;
                    const arr = carListJson.filter((itm) => {
                      if (itm.brand === carBrand) {
                        return itm.models;
                      }
                    });

                    setCarModels([]);
                    delayFn(() => {
                      setCarModels(arr[0]?.models || []);
                    }, 1000);
                    setData({
                      ...data,
                      car_brand: val,
                      // models: arr[0]?.models || [],
                    });
                  }
                }}
                data={["All brands", ...carBrandSelect()]}
              />
            </View>
            <View
              style={{
                borderTopColor: "#E4E7EC",
                borderTopWidth: 1,
                marginBottom: 25,
              }}
            />

            <Text
              style={{
                marginLeft: 2,
                marginBottom: 10,
                fontFamily: fontsPoppins.p7Bold,
              }}
              allowFontScaling={false}
            >
              Car year
            </Text>
            <View style={tw`flex-row items-center justify-between`}>
              <DropDownBadges
                data={yearsFn()}
                label="Min year"
                width="45%"
                value={data?.min_year}
                placheHolder="Select year"
                onChange={(e) => {
                  setData({
                    ...data,
                    min_year: +e,
                    max_year: +data.max_year <= +e && +e,
                  });
                }}
                RIcon={
                  <Ionicons name="calendar-outline" size={20} color={"#777"} />
                }
              />
              <View style={tw`h-[1px] w-[10px] bg-[#000] mt-[30px]`} />
              <DropDownBadges
                data={yearsFn()}
                label="Max year"
                width="45%"
                value={data?.max_year}
                placheHolder="Select year"
                onChange={(e) => {
                  setData({ ...data, max_year: +e });
                }}
                RIcon={
                  <Ionicons name="calendar-outline" size={20} color={"#777"} />
                }
              />
            </View>

            <View
              style={{
                borderTopColor: "#E4E7EC",
                borderTopWidth: 1,
                marginVertical: 15,
              }}
            />
            <View>
              <DropDown
                placheHolder="All transmissions"
                label="Car transmission"
                textAlign={"left"}
                RIcon={
                  <Ionicons name="chevron-down" size={20} color={"#667185"} />
                }
                value={data?.transmission}
                onChange={(val) => {
                  if (!val.includes("All Types")) {
                    setData({ ...data, transmission: val });
                  }
                }}
                data={["All Types", "Automatic", "Manual"]}
              />
            </View>
            <View
              style={{
                borderTopColor: "#E4E7EC",
                borderTopWidth: 1,
                marginVertical: 15,
              }}
            />

            <View>
              <DropDown
                placheHolder="All seats"
                label="Number of Seats"
                textAlign={"left"}
                RIcon={
                  <Ionicons name="chevron-down" size={20} color={"#667185"} />
                }
                value={data?.number_of_seats}
                onChange={(val) => {
                  if (!val.includes("All Types")) {
                    setData({
                      ...data,
                      number_of_seats: +val.split("_")[0],
                    });
                  }
                }}
                data={[
                  "All seats",
                  "4 or more seats",
                  "5 or more seats",
                  "6 or more seats",
                  "7 or more seats",
                ]}
              />
            </View>
            <View
              style={{
                borderTopColor: "#E4E7EC",
                borderTopWidth: 1,
                marginVertical: 15,
              }}
            />
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 50,
                gap: 5,
              }}
              onPress={() =>
                setData({
                  ...data,
                  comes_with_driver: !data?.comes_with_driver,
                })
              }
            >
              <Pressable
                style={{
                  width: 20,
                  height: 20,
                  borderColor: "#D0D5DD",
                  borderWidth: 1,
                  borderRadius: 4,
                  backgroundColor: data?.comes_with_driver
                    ? COLORS.primary
                    : "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {data?.comes_with_driver && (
                  <Ionicons size={13} color={"#fff"} name="checkmark" />
                )}
              </Pressable>
              <View style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    color: "#101928",
                    fontSize: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "visible",
                    fontFamily: fontsPoppins.p5Medium,
                  }}
                >
                  Only cars with driver
                </Text>

                <Text
                  style={{
                    color: "#667185",
                    fontSize: 12,
                    fontFamily: fontsPoppins.p4Regular,
                  }}
                >
                  This will only show cars that come with drivers
                </Text>
              </View>
            </Pressable>

            <View
              style={{
                height: 200,
              }}
            />
          </View>
        </KeyboardAwareScrollView>
        <CustomButton
          label="Apply filters"
          style={{ marginBottom: 10, height: 40 }}
          onPress={() => {
            const fmtData = {};
            Object.entries(data).map((dt) => {
              if (dt[0].includes("_price")) {
                const val = dt[1]?.toString().split(",").join("");
                return (fmtData[dt[0]] = +val?.slice(1, val?.length));
              } else {
                return (fmtData[dt[0]] = dt[1]);
              }
            });

            dispatch(SET_FILTER({ ...data, filterActive: filterActiveFn() }));
            navigation.goBack();
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default BrandPick;
