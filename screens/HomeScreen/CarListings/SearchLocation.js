import { GOOGL_MAPS_API_KEY } from "@env";
import { Text, View } from "moti";
import React, { useEffect, useState } from "react";
import { Image, Platform, ScrollView, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import BackButton from "../../../components/BackButton";
import useLocation from "../../../hooks/useLocation";
import { SET_CURRENT_LOCATION } from "../../../store/appSlice";
import { addEllipses } from "../../../utils";
import ScreenWrapper from "../../ScreenWrapper";

const SearchLocation = ({ navigation }) => {
  const dispatch = useDispatch();
  const { location, getLocationHistory, setLocationHistory } = useLocation();
  const [history, setHistory] = useState([]);
  const [load, setLoad] = useState(false);
  const loadLocationHistory = async () => {
    try {
      const locHist = await getLocationHistory();
      setHistory(locHist);
    } catch (error) {}
  };
  const storeLocationHistory = async (obj) => {
    await setLocationHistory(obj);
  };
  useEffect(() => {
    loadLocationHistory();
  }, []);

  const getSelectedLoc = (latitude, longitude) => {
    const apiKey = GOOGL_MAPS_API_KEY;
    const lat = latitude;
    const lng = longitude;
    const radius = 100; // in meters

    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        storeLocationHistory({
          ...data.results[0],
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
        });
        dispatch(
          SET_CURRENT_LOCATION({
            ...data.results[0],
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
          })
        );
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error fetching nearby places:", error);
      });
  };
  const getLoc = () => {
    setLoad(true);
    const apiKey = GOOGL_MAPS_API_KEY;
    const lat = location?.coords?.latitude;
    const lng = location?.coords?.longitude;
    const radius = 100; // in meters

    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(
          SET_CURRENT_LOCATION({
            ...data.results[0],
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
          })
        );
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error fetching nearby places:", error);
      });

    setLoad(false);
  };
  return (
    <ScreenWrapper dismissKeyboard={true}>
      <View
        style={{
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",
        }}
      >
        <BackButton type={2} onPress={() => navigation.goBack()} />
        <Text
          style={{
            color: "#101928",
            fontWeight: "600",
            fontSize: 14,
            fontFamily: "Poppins_400Regular",
          }}
        >
          Search for location
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            marginTop: 20,
          }}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="always"
        >
          <GooglePlacesAutocomplete
            placeholder=" Address, city, hotels or other places"
            onPress={async (data, details = null) => {
              // 'details' is provided when fetchDetails = true
              storeLocationHistory({
                ...data,
                ...details,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
              dispatch(
                SET_CURRENT_LOCATION({
                  ...data,
                  ...details,
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                })
              );
              navigation.goBack();
            }}
            textInputProps={{
              placeholderTextColor: "#999",
              returnKeyType: "search",
            }}
            listViewDisplayed={false}
            styles={{
              container: {
                flex: 1,
                maxHeight: 150,
              },
              textInputContainer: {
                borderColor: "#D0D5DD",
                borderWidth: 1,
                padding: 0,
                height: 46,
              },
              textInput: {
                fontSize: 14,
                backgroundColor: "transparent",
              },
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

          <TouchableOpacity
            style={{
              marginVertical: 16,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              borderTopWidth: 1,
              borderTopColor: "#eee",
              paddingTop: 4,
              backgroundColor: load ? "#fff" : null,
            }}
            onPress={() => getLoc()}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#F0F2F5",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 15, height: 15, resizeMode: "contain" }}
                source={require("../../../assets/icons/mapIcon.png")}
              />
            </View>
            <Text
              style={{
                color: "#101928",
                fontWeight: "500",
                fontSize: 14,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Current Location
            </Text>
          </TouchableOpacity>
          {history.length > 0 && (
            <Text
              style={{
                color: "#667185",
                fontSize: 12,
                fontWeight: "500",
                fontFamily: "Poppins_400Regular",
              }}
            >
              History
            </Text>
          )}
          <View>
            {history.map((his, i) => (
              <TouchableOpacity
                style={{
                  marginTop: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
                key={i}
                onPress={() => {
                  const coord = his?.geometry.location;
                  getSelectedLoc(coord?.lat, coord?.lng);
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#F0F2F5",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      width: 15,
                      height: 15,
                      resizeMode: "contain",
                    }}
                    source={require("../../../assets/icons/mapIcon.png")}
                  />
                </View>
                <Text
                  style={{
                    color: "#101928",
                    fontSize: 14,
                    fontWeight: "500",
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  {addEllipses(his?.description || his?.name, 40, 3)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            bottom: 20,
            zIndex: 100,
            left: "3%",
          }}
        >
          <Text
            style={{
              color: "#475367",
              fontSize: 14,
              fontWeight: "500",
              fontFamily: "Poppins_400Regular",
            }}
          >
            Powered by
          </Text>
          <Image
            style={{
              width: 62,
              height: 17,
              resizeMode: "contain",
              marginTop: 5,
            }}
            source={require("../../../assets/icons/gname.png")}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SearchLocation;
