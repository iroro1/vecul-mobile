import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
// import { GOOGL_MAPS_API_KEY } from "@env";

import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
// import { PanGestureHandler } from "react-native-gesture-handler";
import { GOOGL_MAPS_API_KEY } from "@env";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import NotFound from "../../../components/NotFound";
import Search from "../../../components/Search";
import useAuth from "../../../hooks/useAuth";
import useLocation from "../../../hooks/useLocation";
import useRefreshToken from "../../../hooks/useRefreshToken";
import { listCarsApi } from "../../../services/coreService";
import { likeCarApi } from "../../../services/favoriteService";
import {
  SET_AUTH_STATE,
  SET_CARS_LIST,
  SET_CURRENT_LOCATION,
  authSelector,
  carsSelector,
  currentLocationSelector,
  dateRangeSelector,
  filterSelector,
} from "../../../store/appSlice";
import { capitalize, currencyPipe, removeSeparators } from "../../../utils";
import { COLORS } from "../../../utils/colors";
import ScreenWrapper from "../../ScreenWrapper";
import NotificationBell from "../Notifications/NotificationBell";
import CarListing from "./CarListing";
import MarkerCustom from "./MarkerCustom";
import { Button } from "react-native";
import { fontsPoppins } from "../../../utils/fonts";
import TextCustom from "../../../components/TextCustom";

const Main = () => {
  const navigation = useNavigation();
  const routes = useRoute();
  const { userData } = useAuth();
  const mapRef = useRef();
  const userStore = useSelector(authSelector);
  const carsListed = useSelector(carsSelector);
  const store = useSelector((state) => state.app);

  const dateFilter = useSelector(dateRangeSelector);
  const dispatch = useDispatch();
  const isAuth = userStore?.id_token ? true : false;
  const { callRefresh } = useRefreshToken();
  const [data, setData] = useState({
    date: "01 Feb - 04 Feb",
    searchTerm: "",
  });
  const [fetchKey, setFetchKey] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [viewType, setViewType] = useState("list");
  const [region, setRegion] = useState({
    ...location?.coords,
  });
  const checkAuth = async () => {
    const user = userData;
    if (user) {
      dispatch(SET_AUTH_STATE(user));
    }
    await callRefresh();
  };
  const { location } = useLocation();
  const loadLocationHistory = async () => {
    try {
      const res = await getLocationHistory();
      if (res?.length > 0) {
        setRegion({ ...location?.coords });
        dispatch(SET_CURRENT_LOCATION({ ...location?.coords }));
      } else {
        if (!currentLocationSelectorData) {
          setRegion({ ...location?.coords });
          dispatch(SET_CURRENT_LOCATION({ ...location?.coords }));
        }
      }
    } catch (error) {}
  };
  useMemo(async () => {
    loadLocationHistory();
  }, [location]);

  useEffect(() => {
    mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, left: 50, right: 50, bottom: 50 },
    });
  }, [viewType]);

  useEffect(() => {
    checkAuth();
  }, []);

  const filterData = useSelector(filterSelector);
  const dateFilterData = useSelector(dateRangeSelector);
  const currentLocationSelectorData = useSelector(currentLocationSelector);
  const [load, setLoad] = useState(true);

  const [loading, setLoading] = useState(false);
  const [mapCar, setMapCar] = useState({});
  const [carsList, setCarsList] = useState([]);

  const [hasMore, setHasMore] = useState(true);

  const renderFooter = () => {
    return loading ? (
      <ActivityIndicator
        style={{
          marginTop: 10,
          marginBottom: 150,
          alignItems: "center",
        }}
      />
    ) : (
      <View style={{ height: 300 }} />
    );
  };

  const loadCars = async () => {
    const fmtData = {};
    Object.entries(filterData).map((dt) => {
      if (dt[0].includes("_price")) {
        const val = dt[1]?.toString().split(",").join("");
        return (fmtData[dt[0]] = +val?.slice(1, val?.length));
      } else if (dt[0].includes("filterActive")) {
        return;
      } else {
        return (fmtData[dt[0]] = dt[1]);
      }
    });
    const aa =
      dateFilter?.starDate || dateFilter.endDate
        ? {
            latitude: `${currentLocationSelectorData?.latitude}`,
            longitude: `${currentLocationSelectorData?.longitude}`,
            ...fmtData,
            start_date: dateFilter?.startDate,
            end_date: dateFilter?.endDate,
            user_id: userStore?.sub,
          }
        : {
            latitude: `${currentLocationSelectorData?.latitude}`,
            longitude: `${currentLocationSelectorData?.longitude}`,
            ...fmtData,
            user_id: userStore?.sub,
          };
    try {
      if (!fetchKey && hasMore) {
        const res = await listCarsApi(aa, userData?.id_token);
        if (res?.status === 200) {
          console.log(res, "L", aa);
          setFetchKey(res.data.data.last_evaluated_key);
          !res.data.data.last_evaluated_key && setHasMore(true);
          dispatch(SET_CARS_LIST(res?.data?.data?.cars));
          setCarsList(res?.data?.data?.cars);
        } else if (res?.data?.message.includes("unauthorized")) {
          await callRefresh();
        } else {
          dispatch(SET_CARS_LIST([]));
          setCarsList([]);
          setHasMore(false);
          setLoading(false);
          setRefreshing(false);
        }
      } else {
        const res = await listCarsApi(
          { ...aa, last_evaluated_key: fetchKey },
          userData?.id_token
        );
        console.log(res, "L", aa);

        if (res?.status === 200) {
          !res.data.data.last_evaluated_key && setHasMore(false);
          setFetchKey(res.data.data.last_evaluated_key || null);
          dispatch(SET_CARS_LIST([...carsListed, ...res?.data?.data?.cars]));
          setCarsList([...carsListed, res?.data?.data?.cars]);
        } else if (res?.data?.message.includes("unauthorized")) {
          await callRefresh();
        } else if (res?.response?.status === 404) {
          console.log(333);
          dispatch(SET_CARS_LIST([]));
          setCarsList([]);
          setHasMore(false);
          setLoading(false);
          setRefreshing(false);
          setFetchKey(null);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    setFetchKey(null);
    dispatch(SET_CARS_LIST([]));
    setLoad(true);
    setHasMore(true);
    loadCars();
  }, [currentLocationSelectorData, filterData, dateFilterData]);

  const dateFrmtFn = (dt) => {
    const newDate = new Date(dt).toDateString().split(" ");
    const dtObj = {
      day: newDate[0],
      month: newDate[1],
      dayDigit: newDate[2],
      year: newDate[3],
    };
    return dtObj;
  };
  const strtDt = dateFrmtFn(dateFilterData?.starDate);
  const endDt = dateFrmtFn(dateFilterData?.endDate);
  const labelForDate = `${strtDt?.dayDigit} ${strtDt?.month} - ${endDt?.dayDigit} ${endDt?.month}`;

  const apiKey = GOOGL_MAPS_API_KEY;
  // async function getDistanceMatrix(origins, destinations, mode = "driving") {
  //   try {
  //     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
  //       origins
  //     )}&destinations=${encodeURIComponent(
  //       destinations
  //     )}&mode=${mode}&key=${apiKey}`;
  //     const response = await axios.get(url);

  //     if (response.data.status === "OK") {
  //       return response.data.rows[0].elements[0];
  //     } else {
  //       throw new Error(`Distance Matrix API error: ${response.data.status}`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  const likeFn = async () => {
    if (isAuth) {
      try {
        const res = await likeCarApi(
          {
            car_id: mapCar?.sk,
            like: !mapCar?.liked,
          },
          userStore?.id_token
        );
        if (res?.data?.success) {
          setMapCar({ ...mapCar, liked: !mapCar?.liked });
        } else if (res?.response?.status === 401) {
          // likeFn();
          const a = await callRefresh();
          console.log(a, "ref");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      navigation.navigate("LoginScreen");
    }
  };

  console.log(carsListed, "carsListed");
  return (
    <ScreenWrapper dismissKeyboard={false}>
      <View
        style={{
          marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            position: "relative",
          }}
        >
          {isAuth && (
            <TextCustom
              fontFamily={fontsPoppins.p6SemiBold}
              twClasses={`text-[#101928] text-[18px]`}
            >
              Hi {`${userStore?.given_name} ` || "User "}
              👋
            </TextCustom>
          )}
          {!isAuth && (
            <TextCustom
              fontFamily={fontsPoppins.p6SemiBold}
              twClasses={`text-[#101928] text-[18px]`}
            >
              Need to rent a ride today?
            </TextCustom>
          )}
          <TextCustom twClasses={`text-[#344054] text-[12px]`}>
            {isAuth
              ? "Let's find the perfect ride for you"
              : "These are cars available near your location"}
          </TextCustom>

          <NotificationBell />
        </View>

        <View
          style={{
            marginVertical: 9,
            flexDirection: "row",
            borderRadius: 5,
            alignItems: "center",
            position: "relative",
          }}
        >
          <View style={{ width: "53%" }}>
            <Search
              value={
                (currentLocationSelectorData?.address_components &&
                  currentLocationSelectorData?.address_components[0]
                    ?.long_name) ||
                currentLocationSelectorData?.name ||
                "Current Location"
              }
              onPress={() => navigation.navigate("SearchLocation")}
            />
          </View>
          <TouchableOpacity
            style={{
              marginVertical: 9,
              flexDirection: "row",
              height: 46,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              alignItems: "center",
              position: "relative",
              borderColor: "#D0D5DD",
              borderWidth: 1,
              width: "29%",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("DateRangeScreen")}
          >
            <TextCustom style={tw`text-[#101928] text-[12px]`}>
              {!labelForDate.includes("undefined") ? labelForDate : data?.date}
            </TextCustom>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`w-[41px] h-[46px] rounded-[6px] border border-[#D0D5DD] flex items-center justify-center absolute right-[3%] android:top-[10px] ios:top-[10px]`,
              {
                zIndex: 100,
                backgroundColor: store.filterData.filterActive
                  ? COLORS.primary
                  : "#fff",
              },
            ]}
            onPress={() => {
              setFetchKey(null);
              navigation.navigate("BrandPick");
            }}
          >
            <Ionicons
              name="git-branch-outline"
              color={store.filterData.filterActive ? "#fff" : "#555"}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>

      {!load && carsListed.length === 0 && viewType !== "maps" && (
        <View
          style={{
            marginVertical: 20,
            paddingHorizontal: "3%",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 95,
          }}
        >
          <NotFound>
            <Image source={require("../../../assets/images/emptySearch.png")} />
          </NotFound>
        </View>
      )}
      {load && (
        <View
          style={{
            marginVertical: 20,
            paddingHorizontal: "3%",
          }}
        >
          <ActivityIndicator color={COLORS.primary} />
        </View>
      )}
      {viewType === "list" && (
        <FlatList
          style={{
            flex: 1,
            marginTop: 5,
            minHeight: "100%",
          }}
          data={carsListed}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <CarListing
              type={2}
              authState={isAuth}
              authFn={(e) => {
                !e;
              }}
              onChangeLike={() => {
                setFetchKey(null);
                setHasMore(true);
                setLoad(true);
                loadCars();
              }}
              data={item}
            />
          )}
          onEndReached={() => {
            fetchKey && setLoading(true);
            // fetchKey && setHasMore(true);
            fetchKey && loadCars();
            console.log("end", fetchKey);
          }}
          onEndReachedThreshold={0}
          refreshing={refreshing}
          scrollsToTop={false}
          canLoadMore={true}
          onRefresh={() => {
            setLoad(true);
            loadCars();
          }}
          ListFooterComponent={renderFooter}
        />
      )}
      {viewType === "maps" && (
        <Pressable
          style={{
            flex: 1,
            position: "relative",
          }}
          onPress={() => setMapCar({})}
        >
          <MapView
            mapType="mutedStandard"
            ref={mapRef}
            zoomControlEnabled
            style={{
              width: "100%",
              height: "100%",
            }}
            initialRegion={{
              latitude: currentLocationSelectorData?.latitude || 6.5244,
              longitude: currentLocationSelectorData?.longitude || 3.3792,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={currentLocationSelectorData}
          >
            <Marker
              coordinate={{
                latitude: currentLocationSelectorData?.latitude,
                longitude: currentLocationSelectorData?.longitude,
              }}
              title={`${userStore?.given_name}'s location`}
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

            {carsListed?.map((car, i) => (
              <MarkerCustom
                authState={isAuth}
                data={car}
                setMapCar={(e) => setMapCar(e)}
                lat={currentLocationSelectorData?.latitude}
                lng={currentLocationSelectorData?.longitude}
              />
            ))}
          </MapView>
        </Pressable>
      )}
      {mapCar?.car_brand && (
        <View
          style={{
            height: 123,
            position: "absolute",
            zIndex: 99,
            bottom: 10,
            left: 0,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              borderColor: "#E4E7EC",
              borderWidth: 1,
              width: 314,
              height: "100%",
              flexDirection: "row",
              borderRadius: 8,
              overflow: "hidden",

              shadowColor: "#E4E7EC",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 1,
            }}
            onPress={() => {
              if (isAuth) {
                navigation.navigate("CarDetail", { data: mapCar });
              } else {
                navigation.navigate("AuthStart");
              }
            }}
          >
            <Image
              style={{
                height: "100%",
                width: 144,
              }}
              resizeMode="cover"
              source={{ uri: mapCar?.car_pictures[0] }}
              alt="carImg"
            />
            <View
              style={{
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: "#101928",
                  fontSize: 14,
                  fontWeight: "700",
                  marginBottom: 5,
                }}
              >{`${capitalize(removeSeparators(mapCar?.car_brand, "-"))} - ${
                mapCar?.car_year
              }`}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  gap: 4,
                }}
              >
                <Ionicons size={13} color={"#F3A218"} name="star" />
                <Text
                  style={{
                    color: "#344054",
                    fontSize: 10,
                  }}
                >
                  {mapCar?.rating_avg_value ? +mapCar?.rating_avg_value : "5"}
                </Text>
                <Text
                  style={{
                    marginLeft: 5,
                    color: "#344054",
                    fontSize: 10,
                  }}
                >
                  {"("} {mapCar?.trips ? mapCar?.trips : "0"} {")"} trips
                </Text>
              </View>
              <Text
                style={{
                  marginTop: "auto",
                  color: "#101928",
                  fontSize: 12,
                }}
              >
                {currencyPipe(mapCar?.price)}
                <Text
                  style={{
                    color: "#344054",
                  }}
                >
                  / day
                </Text>
              </Text>
              <Text
                style={{
                  color: "#667185",
                  fontSize: 10,
                  textDecorationLine: "line-through",
                }}
              >
                {mapCar?.previous_price > 0 &&
                  currencyPipe(mapCar?.previous_price)}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                height: 24,
                width: 24,
                borderRadius: 8,
                position: "absolute",
                zIndex: 10,
                right: 5,
                top: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                likeFn();
                //
              }}
            >
              <Ionicons
                color={mapCar?.liked ? COLORS.red : "#344054"}
                name={mapCar?.liked ? "heart" : "heart-outline"}
                size={18}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          position: "absolute",
          bottom: 10,
          left: 0,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!load && (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1038C3",
              padding: 12,
              borderRadius: 6,
              gap: 4,
              height: 40,
            }}
            onPress={() => {
              if (viewType === "list") setViewType("maps");
              else setViewType("list");
            }}
          >
            <Ionicons
              name={viewType === "list" ? "map-outline" : "list-outline"}
              size={20}
              color={"#fff"}
            />
            <TextCustom
              style={{
                color: "#fff",
                minWidth: 65,
              }}
            >
              {viewType === "list" ? "Map view" : "List view"}
            </TextCustom>
          </TouchableOpacity>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Main;
