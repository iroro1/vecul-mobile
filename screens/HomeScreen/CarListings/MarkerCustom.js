import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { getCarByIdApi } from "../../../services/coreService";
import { authSelector } from "../../../store/appSlice";

const MarkerCustom = ({ data, setMapCar, lat = 0, lng = 0 }) => {
  const [carData, setCarData] = useState({});
  const [load, setLoad] = useState(true);

  const userStore = useSelector(authSelector);

  const loadDetail = async () => {
    setLoad(true);
    try {
      const res = await getCarByIdApi(
        {
          car_id: data,
        },
        userStore?.id_token
      );
      console.log(res, "cd");
      if (res?.status === 200) {
        setCarData(res?.data?.data?.car);
      } else {
        if (res?.response?.status === 401) {
          // const r = await callRefresh();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  useEffect(() => {
    loadDetail();
  }, []);

  //   console.log(carData, "cd");
  return (
    <Marker
      coordinate={{
        latitude: +carData?.latitude || lat,
        longitude: +carData?.longitude || lng,
      }}
      onPress={() => setMapCar(carData)}
      on
      identifier="destination"
      style={{
        marginHorizontal: 30,
        width: 250,
      }}
    >
      {load ? (
        <ActivityIndicator />
      ) : (
        <View
          style={{
            height: 25,
            width: 25,
            borderRadius: 12.5,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#888",
          }}
        >
          <Image
            source={require("../../../assets/icons/v-logo.png")}
            style={{ height: 15, width: 15, borderRadius: 10 }}
            resizeMode="contain"
          />
        </View>
      )}
    </Marker>
  );
};

export default MarkerCustom;
