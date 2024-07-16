import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import BackButton from "../../../components/BackButton";
import InputField from "../../../components/InputField";
import NotFound from "../../../components/NotFound";
import VeculAppLoader from "../../../components/VeculAppLoader";
import { getStoreApi, listMyCarsApi } from "../../../services/coreService";
import {
  SET_AUTH_STATE,
  SET_MY_CARS,
  authSelector,
} from "../../../store/appSlice";
import ScreenWrapper from "../../ScreenWrapper";
import SwitchForHostList from "./SwitchForHostlist";
import { delayFn } from "../../../utils";

const HostCarList = (props) => {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const userStore = useSelector(authSelector);
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [load, setLoad] = useState(false);
  const loadMyCars = async () => {
    setLoad(true);
    try {
      const res = await listMyCarsApi({}, userStore?.id_token);
      if (res?.status === 200) {
        dispatch(SET_MY_CARS(res?.data?.data?.cars));
        setData(res?.data?.data?.cars);
        setTemp(res?.data?.data?.cars);
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  const searchFn = async (e) => {
    console.log(e, "e");
    const dt = data.filter((itm) => {
      if (
        itm?.car_brand?.toLowerCase().includes(e.toLowerCase()) ||
        itm?.car_model?.toLowerCase().includes(e.toLowerCase())
      ) {
        return itm;
      }
    });
    if (e.length === 0) {
      console.log(22);
      setLoad(true);
      delayFn(() => {
        setData(temp);
      }, 500);
      setLoad(false);
    }
    setData([...dt]);
  };

  useEffect(() => {
    loadMyCars();
  }, []);
  const goToHost = async () => {
    try {
      const res = await getStoreApi(userStore?.id_token);
      if (res?.data?.success) {
        dispatch(SET_AUTH_STATE({ ...userStore, hasHostAccount: true }));
        navigation.navigate("VehicleAddress", {
          path: "More",
          hostAccountCreated: false,
        });
      } else {
        navigation.navigate("HostingAs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScreenWrapper dismissKeyboard={false}>
      <TouchableOpacity
        style={{
          position: "absolute",
          backgroundColor: "#1038C3",
          width: 44,
          height: 44,
          zIndex: 999,
          bottom: 20,
          right: 10,
          borderRadius: 22,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={goToHost}
      >
        <Ionicons name="add" size={25} color={"#fff"} />
      </TouchableOpacity>
      {load ? (
        <VeculAppLoader size={80} />
      ) : (
        <View>
          <View
            style={{
              marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginBottom: 10,
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
              Vehicle list
            </Text>
          </View>

          <View>
            <View
              style={{
                marginHorizontal: "3%",
                position: "relative",
              }}
            >
              <Ionicons
                name="search"
                size={22}
                color={"#667185"}
                style={{
                  position: "absolute",
                  zIndex: 99,
                  top: 20,
                  left: 10,
                }}
              />
              <InputField
                onChange={searchFn}
                pl={40}
                label=""
                placheHolder="Search"
              />
            </View>

            {data?.length === 0 && (
              <View
                style={tw`w-[70%] mx-auto h-[50%] justify-center items-center`}
              >
                <NotFound
                  subTitle={`You have not added any vehicles yet. Use the circular button
                  at the bottom right of this screen to add a vehicle`}
                >
                  <Image
                    source={require("../../../assets/images/emptySearch.png")}
                  />
                </NotFound>
              </View>
            )}
            <FlatList
              style={{
                marginHorizontal: "3%",
                marginTop: 20,
              }}
              ListFooterComponent={<View style={{ height: 300 }} />}
              data={data}
              keyExtractor={(e) => e.sk}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    marginBottom: 20,
                    flexDirection: "row",
                    gap: 10,
                    position: "relative",
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                    paddingBottom: 15,
                  }}
                >
                  <Image
                    style={{
                      borderRadius: 8,
                    }}
                    height={78}
                    width={106}
                    source={{ uri: item.car_pictures[0] }}
                  />
                  <View style={tw`w-[60%]`}>
                    <Text style={{ fontWeight: "700", fontSize: 16 }}>
                      {item?.car_brand} {item?.car_model} - {item?.car_year}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 14,
                        marginVertical: 10,
                        flexDirection: "row",
                      }}
                    >
                      # {item?.price} /{" "}
                      <Text
                        style={{
                          fontWeight: "400",
                          color: "#344054",
                        }}
                      >
                        day
                      </Text>
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="star" color={"#F3A218"} size={14} />
                      <Text
                        style={{
                          fontWeight: "400",
                          color: "#344054",
                          fontSize: 12,
                        }}
                      >
                        4.7 (12 trips)
                      </Text>
                    </View>
                  </View>
                  <View style={tw`absolute right-0`}>
                    <SwitchForHostList
                      state={item?.car_availabilty}
                      switchFn={(e) => {
                        console.log(e, "switch");
                      }}
                    />
                  </View>
                  {item?.status === "available" && (
                    <View
                      style={{
                        position: "absolute",
                        right: 0,
                        bottom: 15,
                        backgroundColor: "#E7F6EC",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 30,
                      }}
                    >
                      <Text
                        style={{
                          color: "#0F973D",
                          fontSize: 12,
                        }}
                      >
                        Availale
                      </Text>
                    </View>
                  )}

                  {item?.status === "unavailable" && (
                    <View
                      style={{
                        position: "absolute",
                        right: 0,
                        bottom: 15,
                        backgroundColor: "#FBEAE9",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 30,
                      }}
                    >
                      <Text
                        style={{
                          color: "#9E0A05",
                          fontSize: 12,
                        }}
                      >
                        Unavailable
                      </Text>
                    </View>
                  )}
                  {item?.status === "booked" && (
                    <View
                      style={{
                        position: "absolute",
                        right: 0,
                        bottom: 15,
                        backgroundColor: "#E3EFFC",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 30,
                      }}
                    >
                      <Text
                        style={{
                          color: "#1038C3",
                          fontSize: 12,
                        }}
                      >
                        Booked
                      </Text>
                    </View>
                  )}
                  {item?.status === "pending_review" && (
                    <View
                      style={{
                        position: "absolute",
                        right: 0,
                        bottom: 15,
                        backgroundColor: "#F0F2F5",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 30,
                      }}
                    >
                      <Text
                        style={{
                          color: "#344054",
                          fontSize: 12,
                        }}
                      >
                        Pending Review
                      </Text>
                    </View>
                  )}
                </Pressable>
              )}
              onEndReached={() => console.log("end")}
              onEndReachedThreshold={0.5}
              onRefresh={() => loadMyCars()}
              refreshing={false}
            />
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
};

export default HostCarList;
