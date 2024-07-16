import { GOOGL_MAPS_API_KEY } from "@env";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Platform, Pressable, StatusBar, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import VeculAppLoader from "../../../components/VeculAppLoader";
import useAuth from "../../../hooks/useAuth";
import useLocation from "../../../hooks/useLocation";
import {
  ADD_CAR_DATA_CREATE,
  currentLocationSelector,
  newCarSelector,
} from "../../../store/appSlice";
import { delayFn } from "../../../utils";
import ScreenWrapper from "../../ScreenWrapper";

const VehicleAddress = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const mapRef = useRef();
  const { userData, setterAuth } = useAuth();
  const { location } = useLocation();
  const initiState = userData?.newCarData?.car_address?.latitude
    ? userData?.newCarData?.car_address
    : location?.coords;
  const [region, setRegion] = useState({ ...initiState });
  const [load, setLoad] = useState(false);
  const currentLocationSelectorData = useSelector(currentLocationSelector);

  const onRegionChange = (region) => {
    setRegion({ ...region });
  };

  const saveFn = () => {
    setLoad(true);

    // Save to store
    dispatch(
      ADD_CAR_DATA_CREATE({
        ...userData?.newCarData,
        car_address: {
          latitude: region.latitude,
          longitude: region.longitude,
        },
      })
    );
    // Save to local Store
    setterAuth({
      ...userData,
      newCarData: {
        ...userData?.newCarData,
        car_address: {
          latitude: region.latitude,
          longitude: region.longitude,
        },
      },
    });
    delayFn(() => {
      navigation.navigate("AddCarDetails");
    }, 3000);
    setLoad(false);
  };

  useEffect(() => {
    dispatch(ADD_CAR_DATA_CREATE(userData?.newCarData));
    setRegion(userData?.car_address);
    setLoad(true);
    delayFn(() => {
      setLoad(false);
    }, 2000);
  }, []);

  useEffect(() => {}, [region]);

  return (
    <ScreenWrapper>
      <View
        style={{
          marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",
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
          Vehicle address
        </Text>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={tw`absolute z-99 left-0 ios:left-[3%] top-[20px] w-[95%] android:w-[100%]`}
        >
          <GooglePlacesAutocomplete
            placeholder=" Address, city, hotels or other places"
            onPress={async (data, details = null) => {
              // 'details' is provided when fetchDetails = true
              setLoad(true);
              setRegion({
                latitude: details?.geometry?.location?.lat,
                longitude: details?.geometry?.location?.lng,
              });
              setLoad(false);
            }}
            textInputProps={{
              placeholderTextColor: "#999",
              returnKeyType: "search",
            }}
            listViewDisplayed={false}
            styles={{
              container: {
                flex: 1,
                height: 140,
              },
              textInputContainer: {},
            }}
            minLength={2}
            enablePoweredByContainer={false}
            fetchDetails
            debounce={4000}
            query={{
              key: GOOGL_MAPS_API_KEY,
              language: "en",
            }}
          />
        </View>
        {/*  */}
        <Pressable
          style={{
            flex: 1,
            position: "relative",
          }}
        >
          {load ? (
            <VeculAppLoader />
          ) : (
            <MapView
              mapType="mutedStandard"
              ref={mapRef}
              zoomControlEnabled
              style={{
                width: Platform.OS === "ios" ? "100%" : "107%",
                height: "100%",
                marginLeft: Platform.OS === "ios" ? 0 : -10,
              }}
              onRegionChange={onRegionChange}
              initialRegion={{
                latitude:
                  region?.latitude ||
                  userData?.newCarData?.car_address?.latitude ||
                  0,
                longitude:
                  region?.longitude ||
                  userData?.newCarData?.car_address?.longitude ||
                  0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              region={currentLocationSelectorData}
            >
              <Marker
                coordinate={{
                  latitude: region?.latitude || 0,
                  longitude: region?.longitude || 0,
                }}
                title="My location"
                identifier="origin"
              >
                <View
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    backgroundColor: "#D4262010",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: 25,
                      width: 25,
                      borderRadius: 12.5,
                      backgroundColor: "#fff",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        height: 18,
                        width: 18,
                        borderRadius: 25,
                        backgroundColor: "#D42620",
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#333",
                      }}
                    />
                  </View>
                </View>
              </Marker>
            </MapView>
          )}
        </Pressable>
        <View style={tw`absolute z-99 left-[3%] bottom-[10px] w-[95%]`}>
          <CustomButton
            label="Next"
            loading={load}
            onPress={saveFn}
            IconR={<Ionicons name="arrow-forward" color={"#fff"} size={16} />}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default VehicleAddress;
