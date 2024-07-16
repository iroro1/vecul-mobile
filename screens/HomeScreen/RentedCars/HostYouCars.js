import { Ionicons } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import CustomButton from "../../../components/CustomButton";
import {
  bookingListApi,
  bookingRentersListApi,
} from "../../../services/bookingService";
import { authSelector } from "../../../store/appSlice";
import BackButton from "../../../components/BackButton";
import NotFound from "../../../components/NotFound";
import tw from "twrnc";
import {
  addEllipses,
  capitalize,
  currencyPipe,
  diffBetweenDates,
  percentageDifference,
} from "../../../utils";
import VeculAppLoader from "../../../components/VeculAppLoader";
import ScreenWrapper from "../../ScreenWrapper";
import TextCustom from "../../../components/TextCustom";

const RentalsScreen = (props) => {
  const { navigation } = props;
  const userStore = useSelector(authSelector);
  const [tab, setTab] = useState("a");
  const [sel, setSel] = useState({});
  const [summary, setSummary] = useState(false);
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);

  const loadBookings = async () => {
    const path = tab === "a" ? "in_progress" : "completed";
    const obj = { status: path };
    setLoad(true);

    try {
      const res = await bookingRentersListApi(obj, userStore?.id_token);
      console.log(res, "res");
      if (res?.status === 200) {
        setData(res?.data?.data?.bookings);
      } else if (res?.response?.status === 404) {
        setData([]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  useEffect(() => {
    loadBookings();
  }, [tab]);

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
  };
  const getDateDifference = (date1, date2) => {
    const parseDate = (dateString) => {
      const [year, month, day] = dateString?.split("/");
      return new Date(year, month - 1, day);
    };

    const d1 = parseDate(date1);
    const d2 = parseDate(date2);

    const diffTime = Math?.abs(d2 - d1);
    const diffDays = Math?.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const daysFromStart =
    sel.start_date && getDateDifference(sel?.start_date, getCurrentDate());

  return (
    <ScreenWrapper>
      <Modal visible={summary} transparent animationType="slide">
        <Pressable
          style={{
            backgroundColor: "#00000098",
            flex: 1,
          }}
          onPress={() => setSummary(false)}
        ></Pressable>
        <View
          style={{
            height:
              sel?.status === "pending" && tab === "a"
                ? 400
                : sel?.status !== "pending" && tab === "a"
                ? 340
                : 303,
            backgroundColor: "#fff",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            position: "absolute",
            bottom: 0,
            zIndex: 99,
            width: "100%",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <View
              style={{
                height: 4,
                width: 46,
                backgroundColor: "#7F7F7F",
              }}
            ></View>
          </View>
          <Text
            style={{
              textAlign: "center",
              marginVertical: 20,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Rental Summary
          </Text>
          {sel?.status === "pending" ? (
            <View
              style={{
                marginHorizontal: "3%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: "#667185",
                    width: 100,
                  }}
                >
                  Hosted by
                </Text>
                <Text
                  style={{
                    color: "#101928",
                    width: "auto",
                    flex: 1,
                    textAlign: "right",
                  }}
                >
                  {sel?.host?.business_name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: "#667185",
                    width: 100,
                  }}
                >
                  Vehicle
                </Text>
                <Text
                  style={{
                    color: "#101928",
                    width: "auto",
                    flex: 1,
                    textAlign: "right",
                  }}
                >
                  {capitalize(sel?.car_name)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: "#667185",
                    width: 100,
                  }}
                >
                  Phone number
                </Text>
                <Text
                  style={{
                    color: "#101928",
                    width: "auto",
                    flex: 1,
                    textAlign: "right",
                  }}
                >
                  {sel?.host?.phone_number}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: "#667185",
                    width: 100,
                  }}
                >
                  Location
                </Text>
                <Text
                  style={{
                    color: "#101928",
                    width: "auto",
                    flex: 1,
                    textAlign: "right",
                  }}
                >
                  {addEllipses(sel?.address?.address || "", 40, 3)}{" "}
                  {sel?.address?.address && ","} {sel?.address?.city},{" "}
                  {sel?.address?.state}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: "#667185",
                  }}
                >
                  Start date
                </Text>
                <Text
                  style={{
                    color: "#101928",
                  }}
                >
                  {sel?.start_date}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: "#667185",
                  }}
                >
                  End date
                </Text>
                <Text
                  style={{
                    color: "#101928",
                  }}
                >
                  {sel?.end_date}
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                marginHorizontal: "3%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: "#667185",
                  }}
                >
                  Total amount
                </Text>
                <Text
                  style={{
                    color: "#101928",
                  }}
                >
                  {currencyPipe(sel?.overview?.total)}
                </Text>
              </View>
              {tab === "a" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#667185",
                    }}
                  >
                    Days left
                  </Text>
                  <Text
                    style={{
                      color: "#101928",
                    }}
                  >
                    {sel?.days_left}
                  </Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: "#667185",
                  }}
                >
                  Start date
                </Text>
                <Text
                  style={{
                    color: "#101928",
                  }}
                >
                  {sel?.start_date}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: "#667185",
                  }}
                >
                  End date
                </Text>
                <Text
                  style={{
                    color: "#101928",
                  }}
                >
                  {sel?.end_date}
                </Text>
              </View>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              marginTop: 35,
              justifyContent: "space-between",
              marginHorizontal: "3%",
            }}
          >
            <CustomButton
              fw="900"
              textStyles={{
                fontWeight: "800",
                color: "#344054",
              }}
              label={sel?.status !== "pending" ? "Pickup condition" : "Go back"}
              style={{
                width: tab === "b" ? "100%" : "48%",
                backgroundColor: "transparent",
                borderColor: "#D0D5DD",
                borderWidth: 1,
                height: 44,
              }}
              onPress={() => {
                setSel({});
                sel?.status !== "pending" &&
                  navigation.navigate("PickupCondition", { data: sel });
                setSummary(false);
              }}
              Icon={
                <>
                  <Ionicons size={15} name="arrow-back" color={"#344054"} />
                </>
              }
            />
            {tab === "a" && (
              <CustomButton
                textStyles={{ fontWeight: "800" }}
                label={
                  sel?.status === "pending" ? "Start rental" : "Extend rental"
                }
                style={{
                  width: "48%",
                  height: 44,
                }}
                disabled={!sel?.active}
                onPress={() => {
                  setSel({});
                  setSummary(false);
                  if (sel?.status === "pending") {
                    navigation.navigate("StartRentalScreen", { data: sel });
                  } else {
                    navigation.navigate("ExtendRentalScreen", {
                      bookingData: sel,
                      carData: sel?.car,
                      tripTime: {
                        start_date: sel?.start_date,
                        end_date: sel?.end_date,
                      },
                    });
                  }
                }}
              />
            )}
          </View>
        </View>
      </Modal>

      <View
        style={{
          marginHorizontal: Platform.OS === "ios" ? "3%" : 0,
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <BackButton type={2} onPress={() => navigation.goBack()} />

        <TextCustom
          style={{
            color: "#101928",
            fontWeight: "600",
            fontSize: 20,
          }}
        >
          Bookings
        </TextCustom>
      </View>
      <View
        style={{
          marginHorizontal: "3%",
          flexDirection: "row",
        }}
      >
        <Pressable
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: tab === "a" ? "#1671D9" : "#E4E7EC",
            height: 44,
          }}
          onPress={() => setTab("a")}
        >
          <Text
            style={{
              color: tab === "a" ? "#1671D9" : "#344054",
              width: "100%",
              textAlign: "center",
            }}
          >
            In progress
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: tab === "b" ? "#1671D9" : "#E4E7EC",
            height: 44,
          }}
          onPress={() => setTab("b")}
        >
          <Text
            style={{
              color: tab === "b" ? "#1671D9" : "#344054",
              width: "100%",
              textAlign: "center",
            }}
          >
            Completed
          </Text>
        </Pressable>
      </View>
      {!load && data?.length === 0 && (
        <View style={tw`h-[80%] justify-center items-center`}>
          <NotFound
            subTitle={
              tab === "a"
                ? "No bookings in progress"
                : "No bookings completed yet."
            }
          >
            <Image source={require("../../../assets/images/emptySearch.png")} />
          </NotFound>
        </View>
      )}
      {load ? (
        <VeculAppLoader />
      ) : (
        <FlatList
          style={{
            marginTop: 16,
            gap: 25,
            flex: 1,
            width: "100%",
            marginHorizontal: "3%",
          }}
          keyExtractor={(i) => i?.booking_id}
          data={data}
          renderItem={({ item }) =>
            item?.days_left !== "completed" ? (
              <TouchableOpacity
                onPress={() => {
                  setSel(item);
                  setSummary(true);
                }}
                style={{
                  flexDirection: "row",
                  gap: 8,
                  marginBottom: 20,
                  width: "80%",
                }}
              >
                <View
                  style={{
                    height: 78,
                    width: 106,
                  }}
                >
                  <Image
                    style={{ borderRadius: 4 }}
                    resizeMode="cover"
                    source={{ uri: item?.image }}
                    height={78}
                    width={106}
                  />
                </View>
                <View
                  style={{
                    width: "83%",
                  }}
                >
                  <Text>{capitalize(item.car_name)}</Text>

                  {tab === "a" && (
                    <View
                      style={{
                        height: 7,
                        backgroundColor: "#E3EFFC",
                        marginTop: 8,
                        position: "relative",
                        borderRadius: 8,
                      }}
                    >
                      <View
                        style={{
                          height: 7,
                          width:
                            item?.status === "pending"
                              ? "0.8%"
                              : item?.days_left <= 1
                              ? "100%"
                              : percentageDifference(
                                  item?.start_date.split("/").join("-"),
                                  item?.end_date.split("/").join("-"),
                                  item?.days_left
                                ) + "%",
                          backgroundColor: "#1038C3",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          zIndex: 10000,
                          borderRadius: 8,
                        }}
                      />
                    </View>
                  )}

                  {tab === "a" && item?.status === "in_progress" && (
                    <Text
                      style={{
                        marginTop: 4,
                        color: "#344054",
                      }}
                    >
                      Days left: {item?.days_left}
                    </Text>
                  )}
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#101928",
                      }}
                    >
                      {currencyPipe(item?.overview?.total)}
                    </Text>
                    {tab === "a" && (
                      <Text
                        style={{
                          color: "#344054",
                          width: 80,
                        }}
                      >
                        {item?.status === "pending"
                          ? "Not started"
                          : item?.end_date}
                      </Text>
                    )}
                    {tab === "b" && (
                      <Text
                        style={{
                          color: "#344054",
                          position: tab === "b" && "absolute",
                          bottom: -30,
                          fontSize: 12,
                        }}
                      >
                        Ended on: {item?.end_date}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSel(item);
                  setSummary(true);
                }}
                style={{
                  flexDirection: "row",
                  gap: 8,
                  marginBottom: 20,
                  width: "80%",
                }}
              >
                <View
                  style={{
                    height: 78,
                    width: 106,
                  }}
                >
                  <Image
                    style={{ borderRadius: 4 }}
                    resizeMode="cover"
                    source={{ uri: item?.image }}
                    height={78}
                    width={106}
                  />
                </View>
                <View
                  style={{
                    width: "83%",
                  }}
                >
                  <Text>{capitalize(item.car_name)}</Text>

                  {tab === "a" && (
                    <View
                      style={{
                        height: 7,
                        backgroundColor: "#E3EFFC",
                        marginTop: 8,
                        position: "relative",
                        borderRadius: 8,
                      }}
                    >
                      <View
                        style={{
                          height: 7,
                          width:
                            item?.status === "pending"
                              ? "0.8%"
                              : item?.days_left <= 1
                              ? "100%"
                              : percentageDifference(
                                  item?.start_date.split("/").join("-"),
                                  item?.end_date.split("/").join("-"),
                                  item?.days_left
                                ) + "%",
                          backgroundColor: "#1038C3",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          zIndex: 10000,
                          borderRadius: 8,
                        }}
                      />
                    </View>
                  )}

                  {tab === "a" && item?.status === "in_progress" && (
                    <Text
                      style={{
                        marginTop: 4,
                        color: "#344054",
                      }}
                    >
                      Days left: {item?.days_left}
                    </Text>
                  )}
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#101928",
                      }}
                    >
                      {currencyPipe(item?.overview?.total)}
                    </Text>
                    {tab === "a" && (
                      <Text
                        style={{
                          color: "#344054",
                          width: 80,
                        }}
                      >
                        {item?.status === "pending"
                          ? "Not started"
                          : item?.end_date}
                      </Text>
                    )}
                    {tab === "b" && (
                      <Text
                        style={{
                          color: "#344054",
                          position: tab === "b" && "absolute",
                          bottom: -30,
                          fontSize: 12,
                        }}
                      >
                        Ended on: {item?.end_date}
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )
          }
          refreshing={false}
          onRefresh={() => {
            loadBookings();
          }}
        />
      )}
    </ScreenWrapper>
  );
};

export default RentalsScreen;
