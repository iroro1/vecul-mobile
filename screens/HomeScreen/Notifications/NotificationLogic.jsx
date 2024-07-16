import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import { notificationListApi } from "../../../services/bookingService";
import { SET_NOTI_UNREAD, authSelector } from "../../../store/appSlice";
import { capitalize, epochToDateFull } from "../../../utils";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import NotFound from "../../../components/NotFound";
import VeculAppLoader from "../../../components/VeculAppLoader";

export default function NotificationLogic() {
  const userStore = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [fetchKey, setFetchKey] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(true);
  const [modalData, setModalData] = useState({
    category: "",
    isOpen: false,
    data: {},
  });

  const listNotification = async () => {
    try {
      if (!fetchKey && hasMore) {
        const res = await notificationListApi({}, userStore?.id_token);
        console.log(res, 4);
        if (res?.status === 200) {
          res?.data?.data?.last_evaluated_key
            ? setFetchKey(res?.data?.data?.last_evaluated_key)
            : setFetchKey(null);
          setNotifications([...res?.data?.data?.notifications]);
          setRefreshing(false);
          setLoading(false);
        } else {
          setRefreshing(false);
          setLoading(false);
        }
      } else {
        const res = await notificationListApi(
          {
            last_evaluated_key: fetchKey,
          },
          userStore?.id_token
        );
        if (res?.status === 200) {
          res?.data?.data?.last_evaluated_key
            ? setFetchKey(res?.data?.data?.last_evaluated_key)
            : setFetchKey(null);
          setNotifications([
            ...notifications,
            ...res?.data?.data?.notifications,
          ]);
          setRefreshing(false);
          setLoading(false);
        } else {
          setRefreshing(false);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
      setLoad(false);
    }
  };

  useEffect(() => {
    dispatch(SET_NOTI_UNREAD(false));
    listNotification();
  }, []);
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

  // console.log(JSON.parse(modalData?.data?.content), "nt");
  // navigation.navigate("NotificationDetail", {
  //   data: item?.notificationContent,
  // });

  console.log(notifications, "modal");
  return load ? (
    <VeculAppLoader />
  ) : (
    <>
      <Modal visible={modalData?.isOpen} animationType="fade" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000090",
          }}
        >
          <Pressable
            style={{
              height: "50%",
            }}
            onPress={() => setModalData({ ...modalData, isOpen: false })}
          ></Pressable>
          <View
            style={{
              height: "50%",
              backgroundColor: "#fff",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              position: "relative",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <View
                style={{
                  backgroundColor: "#7F7F7F",
                  height: 4,
                  width: 46,
                  borderRadius: 18,
                }}
              ></View>
            </View>
            <Text
              style={{
                textAlign: "center",
                marginVertical: 16,
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              {capitalize(modalData?.category)} Details
            </Text>
            <>
              <ScrollView
                style={{
                  flex: 1,
                  height: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "400",
                      fontSize: 16,
                      color: "#667185",
                    }}
                  >
                    Amount/Day
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "400",
                      fontSize: 16,
                    }}
                  >
                    {/* {currencyPipe(bookingData?.price_per_day)} */}
                  </Text>
                </View>
              </ScrollView>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  position: "absolute",
                  bottom: 40,
                  gap: 15,
                  paddingHorizontal: "3%",
                }}
              >
                <CustomButton
                  Icon={<Ionicons size={20} name="arrow-back" />}
                  style={{
                    width: 140,
                    borderWidth: 1,
                    borderColor: "#D0D5DD",
                    backgroundColor: "transparent",
                  }}
                  textStyles={{
                    color: "#000",
                    marginLeft: 6,
                  }}
                  label="Go Back"
                  onPress={() => setModalData({ ...modalData, isOpen: false })}
                />
                <CustomButton
                  style={{
                    width: 219,
                  }}
                  label="Continue"
                  onPress={() => {}}
                />
              </View>
            </>
          </View>
        </View>
      </Modal>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: "3%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
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
              fontSize: 18,
              fontFamily: "Poppins_500Medium",
            }}
          >
            Notifications
          </Text>
        </View>
        <Pressable
          onPress={() => {
            const notRead = notifications?.map((n) => {
              return {
                ...n,
                read: true,
              };
            });
            setNotifications(notRead);
          }}
        >
          <Text
            style={{
              color: "#1038C3",
              fontWeight: "400",
              fontSize: 14,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Mark all as read
          </Text>
        </Pressable>
      </View>

      {notifications.length === 0 && (
        <View
          style={{
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NotFound
            title={"No notifications"}
            subTitle={`You have no notification right now. Check again later.`}
          >
            <Image
              height={150}
              width={150}
              source={require("../../../assets/images/emptyNoti.png")}
            />
          </NotFound>
        </View>
      )}
      <FlatList
        style={{
          flex: 1,
          marginTop: 5,
          minHeight: "100%",
        }}
        data={notifications}
        keyExtractor={(item) => item?.sk}
        renderItem={({ item }, i) => (
          <Pressable
            style={{
              paddingVertical: 10,
              paddingHorizontal: "3%",
              position: "relative",
              paddingLeft: 20,
              marginTop: i === 4 && 30,
              backgroundColor: !item?.read ? "#E3EFFC" : "transparent",
              marginBottom: 6,
            }}
            onPress={() => {
              const notRead = notifications?.map((n) => {
                if (item?.sk === n?.sk) {
                  return {
                    ...n,
                    read: true,
                  };
                } else {
                  return {
                    ...n,
                  };
                }
              });
              setNotifications(notRead);
            }}
            key={i}
          >
            {(i === 0 || i === 4) && (
              <Text
                style={{
                  position: "absolute",
                  top: -20,
                  color: "#101928",
                  fontWeight: "bold",
                  left: "3%",
                }}
              >
                {capitalize(item?.section)}
              </Text>
            )}

            {!item?.read && (
              <View
                style={{
                  height: 8,
                  width: 8,
                  backgroundColor: "#1038C3",
                  borderRadius: 4,
                  position: "absolute",
                  left: "3%",
                  top: 16,
                }}
              />
            )}

            <Text
              style={{
                color: "#101928",
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 3,
                marginLeft: "3%",
              }}
            >
              {capitalize(item?.notificationContent?.title)}
            </Text>
            <Text
              style={{
                color: "#10192880",
                fontSize: 12,
                fontWeight: "500",
                marginBottom: 3,
                marginLeft: "3%",
              }}
            >
              {item?.category === "booking"
                ? capitalize(item?.category)
                : item?.notificationContent?.content}
            </Text>
            <Text
              style={{
                color: item?.read ? "#98A2B3" : "#1038C3",
                fontSize: 12,
                fontWeight: "400",
                marginBottom: 3,
                marginLeft: "3%",
              }}
            >
              {epochToDateFull(item?.created_at)}
            </Text>

            {/* {item?.category === "booking" && (
              <View
                style={{
                  marginTop: 15,
                }}
              >
                <CustomButton
                  style={{
                    width: 157,
                    height: 35,
                  }}
                  label="Rate"
                  onPress={() => {
                    setModalData({
                      category: item?.category,
                      isOpen: true,
                      data: item?.notificationContent,
                    });
                  }}
                />
              </View>
            )} */}
          </Pressable>
        )}
        onEndReached={() => {
          // fetchKey && setLoading(true);
          fetchKey && setHasMore(true);
          fetchKey && listNotification();
          console.log("end");
        }}
        onEndReachedThreshold={0}
        refreshing={refreshing}
        scrollsToTop={false}
        canLoadMore={true}
        onRefresh={() => {
          setLoading(true);
          setRefreshing(true);
          listNotification();
        }}
        ListFooterComponent={renderFooter}
      />
    </>
  );
}
