import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import tw from "twrnc";
import BackButton from "../../../../components/BackButton";
import CustomButton from "../../../../components/CustomButton";
import NotFound from "../../../../components/NotFound";
import VeculAppLoader from "../../../../components/VeculAppLoader";
import { bookingCarOwnersListApi } from "../../../../services/bookingService";
import { authSelector } from "../../../../store/appSlice";
import {
  capitalize,
  currencyPipe,
  percentageDifference,
} from "../../../../utils";
import ScreenWrapper from "../../../ScreenWrapper";

const RentalsScreen = (props) => {
  const { navigation } = props;
  const userStore = useSelector(authSelector);

  const [tab, setTab] = useState("a");
  const [sel, setSel] = useState({});
  const [summary, setSummary] = useState(false);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);

  const loadBookings = async () => {
    const obj = { status: tab === "a" ? "in_progress" : "completed" };
    setLoad(true);
    try {
      const res = await bookingCarOwnersListApi(obj, userStore?.id_token);
      console.log(res, "rs", obj, userStore);
      if (res?.status === 200) {
        setData(res?.data?.data?.bookings);
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  useEffect(() => {
    loadBookings();
  }, [tab]);
  // console.log(percentageDifference("2024/06/01", "2024/06/11"), "2");

  console.log(sel, "sel");
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
            height: tab === "a" ? 353 : 310,
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
                  {!sel.active ? "Not Started" : sel?.days_left}
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

            <View
              style={{
                flexDirection: "row",
                gap: 8,
                marginTop: 35,
                justifyContent: "space-between",
              }}
            >
              <CustomButton
                fw="900"
                textStyles={{
                  fontWeight: "800",
                  color: "#344054",
                }}
                label="Go back"
                style={{
                  width: tab === "a" ? 119 : "100%",
                  backgroundColor: "transparent",
                  borderColor: "#D0D5DD",
                  borderWidth: 1,
                  height: 44,
                }}
                onPress={() => {
                  setSel({});
                  setSummary(false);
                }}
                disabled={!sel.active}
                Icon={
                  <>
                    <Ionicons size={15} name="arrow-back" color={"#344054"} />
                  </>
                }
              />
              {tab === "a" && (
                <CustomButton
                  textStyles={{ fontWeight: "800" }}
                  label="Pickup condition"
                  style={{
                    // width: "100%",
                    width: "65%",
                    height: 44,
                  }}
                  disabled={!sel.active}
                  onPress={() => {
                    setSel({});
                    setSummary(false);
                    navigation.navigate("PickupCondition", {
                      data: sel,
                    });
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>

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
          Bookings
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",
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
            <Image
              source={require("../../../../assets/images/emptySearch.png")}
            />
          </NotFound>
        </View>
      )}
      {load ? (
        <VeculAppLoader />
      ) : (
        <FlatList
          style={{
            marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",
            marginTop: 16,
            gap: 25,
            flex: 1,
          }}
          keyExtractor={(i) => i}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSel(item);
                setSummary(true);
              }}
              style={{
                flexDirection: "row",
                gap: 8,
                marginBottom: 20,
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
                  width: "70%",
                }}
              >
                <Text>
                  {capitalize(item.car_name)}
                  {/* {capitalize(item.car_name)} - {item.car_year} */}
                </Text>
                {/* Progress Bar */}
                {tab === "a" && (
                  <View
                    style={{
                      height: 7,
                      width: "100%",
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
                          percentageDifference(
                            item?.start_date.split("/").join("-"),
                            item?.end_date.split("/").join("-")
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

                {tab === "a" && item?.active && (
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
                      }}
                    >
                      {!item.active ? "Not Starteed" : item?.end_date}
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
          )}
        />
      )}
    </ScreenWrapper>
  );
};

export default RentalsScreen;
