import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { useSelector } from "react-redux";
import tw from "twrnc";
import useAuth from "../hooks/useAuth";
import useShare from "../hooks/useShare";
import useToast from "../hooks/useToast";
import ScreenWrapper from "../screens/ScreenWrapper";
import { calculateBookingsApi } from "../services/coreService";
import { likeCarApi } from "../services/favoriteService";
import { listReviewApi } from "../services/reviewsService";
import { authSelector } from "../store/appSlice";
import {
  addEllipses,
  capitalize,
  currencyPipe,
  dateSubtracterVecul,
  delayFn,
  epochToDate,
  removeSeparators,
} from "../utils";
import { COLORS } from "../utils/colors";
import Avatar from "./Avatar";
import BackButton from "./BackButton";
import CalendarPicker from "./CalendarPicker";
import CustomButton from "./CustomButton";
import InfoCircle from "./InfoCircle";
import Stars from "./Stars";
import useRefreshToken from "../hooks/useRefreshToken";
import { extendCheckApi } from "../services/bookingService";
import TextCustom from "./TextCustom";

const CarDetailComponent = ({ modal, dt, setModal, navigation }) => {
  const { userData, setUserData } = useAuth();
  const { onShare } = useShare();
  const userStore = useSelector(authSelector);
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [book, setBook] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [data, setData] = useState({ ...dt });
  const [modalCal, setModalCal] = useState("");
  const [bookLoad, setBookLoad] = useState(false);
  const [revLoad, setRevLoad] = useState(true);
  const [tripTime, setTripTiime] = useState({});
  const [tripPath, setTripPath] = useState("");
  const windowWidth = Dimensions.get("window").width - 80;
  const [liked, setLiked] = useState(data?.liked);
  const [reviews, setReviews] = useState([]);
  const { callRefresh } = useRefreshToken();
  const handlePageSelected = (event) => {
    // The 'event.nativeEvent.position' gives you the current index
    setIndex(event.nativeEvent.position);
  };
  const loadBookingsData = async () => {
    setBookLoad(true);
    try {
      const res = await calculateBookingsApi(
        {
          car_id: data?.sk,
          start_date: tripTime?.startDate.split("-").join("/"),
          end_date: tripTime?.endDate.split("-").join("/"),
        },
        (userData || userStore)?.id_token
      );
      console.log(res, "resbk");
      if (res?.status === 200) {
        setBookingData(res?.data?.data);
      } else {
        if (
          res?.response?.data?.message?.includes(
            "Please complete your account KYC"
          )
        ) {
          // toast("error", "Error", "Please complete your account KYC", 3000);
          setBook(false);
          navigation?.navigate(
            "More",
            {
              screen: "AccountVerification",
              initial: false,
            },
            {
              data: data,
              from: "carDetail",
            }
          );
        } else if (
          res?.response?.data?.message?.includes(
            "The incoming token has expired"
          )
        ) {
          callRefresh();
          loadBookingsData();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setBookLoad(false);
  };
  const loadReviews = async () => {
    setRevLoad(true);
    try {
      const res = await listReviewApi(
        {
          car_id: data?.sk,
        },
        userStore?.id_token
      );
      console.log(res, "RES");
      if (res?.status === 200) {
        setReviews(res?.data?.data?.cars);
      } else if (res?.response?.status === 401) {
        if (!userData) {
          setUserData(userStore);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setRevLoad(false);
  };

  const carLoopFn = () => {
    if (data?.vehicle_images) return data?.vehicle_images;
    else return data?.car_pictures;
  };

  const { toast } = useToast();

  const getDatesBetween = (startDate, endDate) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    // Array to hold the dates
    let dates = [];
    // Iterate from start date to end date
    while (start <= end) {
      // Push the current date to the array in 'YYYY-MM-DD' format
      dates.push(new Date(start).toISOString().split("T")[0]);

      // Increment the date by one day
      start.setDate(start.getDate() + 1);
    }

    return dates;
  };

  const [bkDates, setBkDates] = useState({});
  const [tempBkDates, setTempBkDates] = useState({});
  let booking_dates = {};
  const plain_booking_dates = [];

  const formatToBook = (c, trip) => {
    const obj = {};
    obj[c] = {
      marked: true,
      color: COLORS.primary,
      textColor: "#fff",
      dotColor: "#fff",
      startingDay: trip === "start" && true,
      endingDay: trip === "end" && true,
      disableTouchEvent: true,
    };

    return obj;
  };

  data?.booking_dates?.forEach((c, i) => {
    let d = c.split("/")[0] + "-" + c.split("/")[1] + "-" + c.split("/")[2];
    plain_booking_dates.push(d);
    booking_dates[d] = {
      marked: true,
      color: "#ffffff",
      textColor: "#bbb",
      dotColor: "#ee0000",
      startingDay: i === 0 && true,
      endingDay: i === data?.booking_dates.length - 1 && true,
      disableTouchEvent: true,
    };
  });
  useEffect(() => {
    loadReviews();
  }, []);
  const likeFn = async () => {
    try {
      const res = await likeCarApi(
        {
          car_id: dt?.sk,
          like: !dt?.liked,
        },
        userData?.id_token
      );
      if (res?.data?.success) {
        setLiked(!liked);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const currentDateM = new Date();
  const year = currentDateM.getFullYear();
  const month = currentDateM.getMonth() + 1; // Months are zero-indexed
  const day = currentDateM.getDate();
  const currentDate = year + "/" + month + "/" + day;
  return (
    <ScreenWrapper dismissKeyboard={false} noSafe={true}>
      <Modal visible={modalCal !== ""} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000010",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "80%",
              height: 400,
              position: "relative",
              backgroundColor: "#ffffff40",
              borderRadius: 6,
            }}
          >
            <View
              style={tw`absolute top-[5px] pr-2 flex-row justify-between w-full rounded-full left-[5px] z-99`}
            >
              <TouchableOpacity
                style={tw`flex-row items-center gap-1 bg-[#fff] p-1 rounded-full`}
                onPress={() => setModalCal("")}
              >
                <Ionicons name="close" color={COLORS.red} size={20} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setBkDates(tempBkDates);
                  setTripTiime({});
                }}
                style={tw`flex-row items-center gap-1 bg-[#fff] p-1 rounded-full`}
              >
                <Ionicons name="refresh-sharp" color={"navy"} size={20} />
              </TouchableOpacity>
            </View>
            {!bookLoad && (
              <CalendarPicker
                stylesCont={{
                  width: "90%",
                }}
                disabledRange={[]}
                onSelect={async (e) => {
                  try {
                    if (true) {
                      const diffMain = dateSubtracterVecul(
                        currentDate.split("/").join("-"),
                        e
                      );
                      if (diffMain > 0) {
                        toast(
                          "error",
                          "You cannot choose a date before current date"
                        );

                        return;
                      }
                      if (tripPath === "startDate") {
                        if (tripTime?.startDate) {
                          setBkDates(tempBkDates);
                          const r = formatToBook(e, "start");
                          delayFn(() => {
                            setBkDates({ ...tempBkDates, ...r });
                            setTripTiime({
                              ...tripTime,
                              startDate: e,
                            });
                          }, 100);
                          setModalCal("");
                        } else {
                          const r = formatToBook(e, "start");
                          setBkDates({ ...bkDates, ...r });
                          setTripTiime({
                            ...tripTime,
                            startDate: e,
                          });
                          setModalCal("");
                        }
                      } else {
                        await extendCheckApi(
                          {
                            car_id: data?.sk,
                            start_date: tripTime?.startDate
                              ?.split("-")
                              ?.join("/"),
                            end_date: e.split("-").join("/"),
                          },
                          userStore?.id_token
                        );
                        const diff = dateSubtracterVecul(
                          tripTime?.startDate,
                          e
                        );
                        if (diff > 0 || !tripTime?.startDate) {
                          toast(
                            "error",
                            "You cannot choose a date before Start date"
                          );
                          return;
                        } else {
                          const datesBtw = getDatesBetween(
                            tripTime?.startDate,
                            e
                          );
                          datesBtw.shift();
                          const obj = {};
                          datesBtw?.forEach((c, i) => {
                            obj[c] = {
                              marked: true,
                              color: COLORS.lightGrey,
                              textColor: "#333",
                              dotColor: COLORS.primary,
                              disableTouchEvent: true,
                              startingDay: false,
                              endingDay: false,
                            };
                          });
                          const r = formatToBook(e, "end");
                          setBkDates({ ...bkDates, ...obj, ...r });

                          setTripTiime({
                            ...tripTime,
                            endDate: e,
                          });
                        }
                        setModalCal("");
                      }
                    }
                  } catch (error) {
                    toast("error", error?.response?.data?.message);
                    console.log(error);
                  }
                }}
                disabledDaysIndexes={[0, plain_booking_dates.length - 1]}
                markedDates={bkDates}
              />
            )}
          </View>
        </View>
      </Modal>
      <Modal visible={modal !== ""} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            // padding: "3%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              position: "absolute",
              top: Platform.OS === "ios" ? 40 : 0,
            }}
          >
            <Ionicons
              onPress={() => setModal("")}
              name="close"
              color={"#fff"}
              size={30}
            />
            <TextCustom
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "400",
                marginTop: 20,
              }}
            >
              {data?.car_brand &&
                capitalize(removeSeparators(data?.car_brand, "-"))}
            </TextCustom>
            <View
              style={{
                minWidth: 50,
                height: 32,
                backgroundColor: "#F0F2F5",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                zIndex: 900,
                right: 0,
                top: 50,
              }}
            >
              <Text
                style={{
                  color: "#475367",
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                {index + 1} of{" "}
                {data.vehicle_images
                  ? data?.vehicle_images?.length
                  : data?.car_pictures?.length}
              </Text>
            </View>
          </View>
          <PagerView
            style={{
              flex: 1,
              height: windowWidth,
            }}
            initialPage={0}
            overdrag
            scrollEnabled
            onPageSelected={handlePageSelected}
          >
            {carLoopFn()?.map((item, i) => (
              <Pressable key={i}>
                <Image
                  style={{
                    height: windowWidth,
                    width: "100%",
                    resizeMode: "contain",
                  }}
                  src={item}
                />
              </Pressable>
            ))}
          </PagerView>
        </View>
      </Modal>
      <Modal visible={book} animationType="fade" transparent>
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
            onPress={() => setBook(false)}
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

            <TextCustom
              style={{
                textAlign: "center",
                marginVertical: 16,
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              Booking Summary
            </TextCustom>
            {bookLoad ? (
              <View
                style={tw`flex-row justify-center items-center h-[60%] w-full`}
              >
                <Text style={{ color: COLORS.primary, fontStyle: "italic" }}>
                  Loading . . .
                </Text>
              </View>
            ) : (
              <>
                <ScrollView
                  style={{
                    flex: 1,
                    height: "100%",
                    marginHorizontal: "3%",
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
                      {currencyPipe(parseFloat(bookingData?.price_per_day))}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 12,
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
                      Trip Duration
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      {bookingData?.trip_duration} day
                      {+bookingData?.trip_duration <= 1 ? "" : "s"}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 12,
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
                      Insurance Per day{" "}
                      <InfoCircle
                        iconColor="#999"
                        fs={12}
                        bg="#000"
                        color="#fff"
                        height="60px"
                        width="200px"
                        textAlign="left"
                        content="The insurance fee covers only accidental damages below #50,000"
                      />
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      {currencyPipe(bookingData?.insurance)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 12,
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
                      Service Charge
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      {currencyPipe(bookingData?.service_charge)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 12,
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
                      Insurance Total
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      {currencyPipe(bookingData?.cumulative_insurance)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 15,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "800",
                        fontSize: 16,
                        color: "#667185",
                      }}
                    >
                      Total to be paid
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "400",
                        fontSize: 16,
                      }}
                    >
                      {currencyPipe(bookingData?.total)}
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
                    bottom: Platform.OS === "ios" ? 40 : 10,
                    gap: 15,
                    height: 40,
                    paddingHorizontal: "3%",
                  }}
                >
                  <CustomButton
                    Icon={<Ionicons size={20} name="arrow-back" />}
                    style={{
                      width: 140,
                      height: 40,
                      borderWidth: 1,
                      borderColor: "#D0D5DD",
                      backgroundColor: "transparent",
                    }}
                    textStyles={{
                      color: "#000",
                      marginLeft: 6,
                    }}
                    label="Go Back"
                    onPress={() => setBook(false)}
                  />
                  <CustomButton
                    style={{
                      width: 200,
                      height: 40,
                    }}
                    label="Continue"
                    onPress={() => {
                      setBook(false);
                      navigation.navigate("PaymentScreen", {
                        carData: dt,
                        bookingData: bookingData,
                        tripTime: tripTime,
                      });
                    }}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <View
        style={{
          height: 280,
          position: "relative",
          marginTop: Platform.OS === "ios" ? 0 : -24,
        }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 900,
            top: 10,
            left: "3%",
          }}
        >
          <BackButton type={2} onPress={() => navigation.goBack()} />
        </View>
        <TouchableOpacity
          style={{
            width: 32,
            height: 32,
            backgroundColor: "#F0F2F5",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            zIndex: 910,
            right: "3%",
            top: 10,
          }}
          onPress={() =>
            onShare(
              `Checkout this great deal on vecul.co. You can drive this car today. look up the availability on the app`,
              `https://vecul.co/ride?param=${JSON.stringify(data)}`
            )
          }
        >
          <Ionicons color={"#344054"} name={"share-social-outline"} size={16} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{
            width: 32,
            height: 32,
            backgroundColor: "#F0F2F5",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            zIndex: 920,
            right: 10,
            top: 10,
          }}
          onPress={async () => {
            likeFn();
          }}
        >
          <Ionicons
            color={liked ? COLORS.red : "#344054"}
            name={liked ? "heart" : "heart-outline"}
            size={16}
            onPress={async () => {
              // setFavorite(data?.isLiked === undefined ? true : false)
              likeFn();
            }}
          />
        </TouchableOpacity> */}

        <View
          style={{
            minWidth: 50,
            height: 32,
            backgroundColor: "#F0F2F5",
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            zIndex: 900,
            left: "3%",
            bottom: 15,
          }}
        >
          <Text
            style={{
              color: "#475367",
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            {index + 1} of {data?.car_pictures?.length}
          </Text>
        </View>
        <PagerView
          style={{
            flex: 1,
            width: Platform.OS === "ios" ? "100%" : "107%",
            marginLeft: Platform.OS === "ios" ? "0%" : "-3.5%",
            height: 274,
          }}
          initialPage={0}
          overdrag
          scrollEnabled
          onPageSelected={handlePageSelected}
        >
          {data?.car_pictures?.map((item, i) => (
            <Pressable
              onPress={() => (modal === "" ? setModal(item) : setModal(""))}
              key={i}
            >
              <Image
                style={{
                  height: 274,
                  width: "100%",
                  resizeMode: "cover",
                }}
                src={item}
              />
            </Pressable>
          ))}
        </PagerView>
      </View>

      <ScrollView
        style={{
          width: "100%",
          position: "relative",
          flex: 1,
          paddingBottom: 150,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: Platform.OS === "ios" ? "2%" : "0%",
            alignItems: "center",
            position: "relative",
            marginTop: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginTop: 7,
            }}
          >
            <Ionicons
              size={19}
              color={data?.rating > 0 ? "#F3A218" : "#aaa"}
              name="star"
            />
            <Text
              style={{
                color: "#344054",
                fontSize: 12,
                fontWeight: "400",
              }}
            >
              {data?.rating_avg_value || 0} ({data?.trips || 0} trips)
            </Text>
          </View>
          <Text
            style={{
              color: "#3F3D56",
              fontSize: 14,
              fontWeight: "700",
              fontFamily: "Poppins_400Regular",
            }}
          >
            {currencyPipe(data?.price)} /day
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: Platform.OS === "ios" ? "100%" : "104%",
            alignItems: "center",
            position: "relative",
            marginTop: 14,
            marginLeft: Platform.OS === "ios" ? "0%" : "-2%",
          }}
        >
          <TextCustom
            style={{
              color: "101928",
              fontSize: 16,
              fontWeight: "800",
              textAlign: "center",
              position: "absolute",
              left: 8,
            }}
          >
            {capitalize(removeSeparators(data?.car_brand, "-"))} -{" "}
            {data?.car_year || "2023"}
          </TextCustom>
          {data?.car_availabilty ? (
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: 10,
                position: "absolute",
                right: 10,
                backgroundColor: data?.car_availabilty
                  ? "#E7F6EC"
                  : COLORS.red + "20",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: data?.car_availabilty ? "#0F973D" : COLORS.red,
                }}
              >
                Available
              </Text>
            </View>
          ) : (
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: 10,
                position: "absolute",
                right: 10,
                borderColor: !data?.car_availabilty ? COLORS.green : COLORS.red,
                borderWidth: 1,
                backgroundColor: !data?.car_availabilty
                  ? COLORS.green + "20"
                  : COLORS.red + "20",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: !data?.car_availabilty ? COLORS.green : COLORS.red,
                }}
              >
                Not Available
              </Text>
            </View>
          )}
        </View>

        <View
          style={tw`flex-row items-center h-[20px] justify-between ios:px-2 mt-[34px]`}
        >
          <Text
            style={{
              color: "#555555",
              fontSize: 13,
              fontWeight: "400",
              fontFamily: "Poppins_400Regular",
            }}
          >
            TRIP DURATION
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",
            marginTop: 25,
          }}
        >
          <Pressable
            style={{
              height: 40,
              position: "relative",
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#C2C2C2",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() => {
              setTripPath("startDate");
              setModalCal("start");
              if (Object.entries(bkDates).length === 0) {
                setBkDates(booking_dates);
                setTempBkDates(booking_dates);
              }
            }}
          >
            <Text
              style={{
                position: "absolute",
                top: -22,
                color: "#101928",
              }}
            >
              Start
            </Text>
            <Ionicons
              name="calendar-outline"
              size={16}
              style={{ position: "absolute", left: 8 }}
            />
            <Text
              style={{
                color: tripTime?.startDate ? "#101928" : "#10192860",
                marginLeft: 34,
                width: "100%",
              }}
            >
              {tripTime?.startDate || "Select start date"}
            </Text>
          </Pressable>

          <Pressable
            style={{
              height: 40,
              position: "relative",
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#C2C2C2",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 30,
            }}
            onPress={() => {
              console.log(tripTime, "TT");
              if (tripTime?.startDate) {
                setTripPath("endDate");
                setModalCal("end");
                if (Object.entries(bkDates).length === 0) {
                  setBkDates(booking_dates);
                }
              } else {
                toast("info", "Please Enter start date first");
              }
            }}
          >
            <Text
              style={{
                position: "absolute",
                top: -22,
                color: "#101928",
              }}
            >
              End
            </Text>
            <Ionicons
              name="calendar-outline"
              size={16}
              style={{ position: "absolute", left: 8 }}
            />
            <Text
              style={{
                color: tripTime?.endDate ? "#101928" : "#10192860",
                marginLeft: 34,
                width: "100%",
              }}
            >
              {tripTime?.endDate || "Select end Date"}
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#DADADA",
            marginTop: 20,
            marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",
          }}
        ></View>
        <TextCustom
          style={{
            color: "#555555",
            fontSize: 13,
            fontWeight: "600",
            paddingHorizontal: Platform.OS === "ios" ? "2%" : "0%",
            marginTop: 16,
          }}
        >
          DESCRIPTION
        </TextCustom>

        <View style={{ position: "relative" }}>
          <TextCustom
            style={{
              color: "#383838",
              fontSize: 13,
              fontWeight: "400",
              paddingHorizontal: Platform.OS === "ios" ? "2%" : "0%",
            }}
          >
            {showMore
              ? data?.car_description
              : addEllipses(data?.car_description, 130, 3)}
          </TextCustom>
          <Pressable
            onPress={() => setShowMore(!showMore)}
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginHorizontal: Platform.OS === "ios" ? "2%" : "0%",
            }}
          >
            <TextCustom
              style={{
                color: "#1038C3",
                fontSize: 13,
              }}
            >
              {showMore ? "Hide" : "Read More"}
            </TextCustom>
          </Pressable>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#DADADA",
            marginTop: 15,
            marginHorizontal: "3%",
          }}
        ></View>
        <TextCustom
          style={{
            color: "#555555",
            fontSize: 13,
            fontWeight: "400",
            paddingHorizontal: "2%",
            marginTop: 15,
            fontFamily: "Poppins_400Regular",
          }}
        >
          CAR FEATURES
        </TextCustom>
        <View />

        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: "0%",
            flexWrap: "wrap",
            marginVertical: 15,
            gap: 20,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 15, height: 20 }}
              source={require("../assets/icons/gear.png")}
            />
            <Text
              style={{
                color: "#555555",
                fontSize: 10,
                fontWeight: "400",
                paddingHorizontal: "3%",
                fontFamily: "Poppins_400Regular",
              }}
            >
              {capitalize(data?.transmission) || "Automatic"}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 15, height: 20 }}
              source={require("../assets/icons/seats.png")}
            />
            <Text
              style={{
                color: "#555555",
                fontSize: 10,
                fontWeight: "400",
                paddingHorizontal: "3%",
                fontFamily: "Poppins_400Regular",
              }}
            >
              {data?.number_of_seats} seats
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 15, height: 20 }}
              source={require("../assets/icons/doors.png")}
            />
            <Text
              style={{
                color: "#555555",
                fontSize: 10,
                fontWeight: "400",
                paddingHorizontal: "3%",
                fontFamily: "Poppins_400Regular",
              }}
            >
              {data?.number_of_doors} doors
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 15, height: 20 }}
              source={require("../assets/icons/fuelType.png")}
            />
            <Text
              style={{
                color: "#555555",
                fontSize: 10,
                fontWeight: "400",
                paddingHorizontal: "3%",
                fontFamily: "Poppins_400Regular",
              }}
            >
              {capitalize(data?.engine_type)}
            </Text>
          </View>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#DADADA",
            marginTop: 15,
            marginHorizontal: "3%",
          }}
        ></View>
        <TextCustom
          style={{
            color: "#555555",
            fontSize: 13,
            fontWeight: "400",
            paddingHorizontal: "2%",
            marginTop: 15,
            fontFamily: "Poppins_400Regular",
            marginHorizontal: "3%",
          }}
        >
          OTHER FEATURES
        </TextCustom>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: "0%",
            flexWrap: "wrap",
            marginVertical: 15,
            gap: 20,
            columnGap: 20,
          }}
        >
          {data?.car_features?.air_condition && (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 15, height: 20 }}
                source={require("../assets/icons/ac.png")}
              />
              <Text
                style={{
                  color: "#555555",
                  fontSize: 10,
                  fontWeight: "400",
                  paddingHorizontal: "3%",
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Air condition
              </Text>
            </View>
          )}
          {data?.car_features?.bluetooth && (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 15, height: 20 }}
                source={require("../assets/icons/bluethoot.png")}
              />
              <Text
                style={{
                  color: "#555555",
                  fontSize: 10,
                  fontWeight: "400",
                  paddingHorizontal: "3%",
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Bluetooth
              </Text>
            </View>
          )}
          {data?.car_features?.aux_input && (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 15, height: 20 }}
                source={require("../assets/icons/aux.png")}
              />
              <Text
                style={{
                  color: "#555555",
                  fontSize: 10,
                  fontWeight: "400",
                  paddingHorizontal: "3%",
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Aux Input
              </Text>
            </View>
          )}
          {data?.car_features?.apple_carplay && (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 15, height: 20 }}
                source={require("../assets/icons/applePlay.png")}
              />
              <Text
                style={{
                  color: "#555555",
                  fontSize: 10,
                  fontWeight: "400",
                  paddingHorizontal: "3%",
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Apple CarPlay
              </Text>
            </View>
          )}
          {data?.car_features?.android_auto && (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 15, height: 20 }}
                source={require("../assets/icons/applePlay.png")}
              />
              <Text
                style={{
                  color: "#555555",
                  fontSize: 10,
                  fontWeight: "400",
                  paddingHorizontal: "3%",
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Android Auto
              </Text>
            </View>
          )}
          {data?.car_features?.usb_charger && (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 15, height: 20 }}
                source={require("../assets/icons/usbCharger.png")}
              />
              <Text
                style={{
                  color: "#555555",
                  fontSize: 10,
                  fontWeight: "400",
                  paddingHorizontal: "3%",
                  fontFamily: "Poppins_400Regular",
                }}
              >
                USB Charger
              </Text>
            </View>
          )}
          {/* <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 15, height: 20 }}
                source={require("../assets/images/airbag.png")}
              />
              <Text
                style={{
                  color: "#555555",
                  fontSize: 10,
                  fontWeight: "400",
                  paddingHorizontal: "3%",
                  fontFamily: "Poppins_400Regular",
                }}
              >
                {data?.car_features?.airbags} airbag (s)
              </Text>
            </View> */}
        </View>

        {data?.comes_with_driver && (
          <>
            <View
              style={{
                borderTopWidth: 1,
                borderColor: "#DADADA",
                marginTop: 15,
              }}
            ></View>
            <TextCustom
              style={{
                color: "#555555",
                fontSize: 13,
                fontWeight: "400",
                fontFamily: "Poppins_400Regular",
                marginTop: 15,
                marginHorizontal: "3%",
              }}
            >
              DRIVER OPTION
            </TextCustom>
            <View
              style={tw`h-[43px] bg-[#E3EFFC] w-[94%] flex-row items-center mt-1 px-2 mx-[3%]`}
            >
              <Text style={tw`text-[#04326B]`}>
                This vehicle comes with a driver when renting
              </Text>
            </View>
          </>
        )}
        {data?.owners_condition && (
          <>
            <View
              style={{
                borderTopWidth: 1,
                borderColor: "#DADADA",
                marginTop: 15,
              }}
            ></View>
            <TextCustom
              style={{
                color: "#555555",
                fontSize: 13,
                fontWeight: "400",
                fontFamily: "Poppins_400Regular",
                marginTop: 15,
                marginHorizontal: "3%",
              }}
            >
              OWNER'S CONDITIONS
            </TextCustom>
            <View
              style={{
                marginHorizontal: "3%",
                marginTop: 8,
              }}
            >
              {data?.owners_condition &&
                Object.entries(data?.owners_condition)?.map((condition, i) => (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      marginBottom: 8,
                    }}
                    key={i}
                  >
                    <Ionicons
                      size={20}
                      color={"#0F973D"}
                      name="checkmark-circle"
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        color: "#101928",
                        width: "95%",
                      }}
                    >
                      {condition[1]}
                    </Text>
                  </View>
                ))}
              {Object.entries(data?.owners_condition)?.length === 0 && (
                <Text>No condition for ride use</Text>
              )}
            </View>
          </>
        )}
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "#DADADA",
            marginTop: 15,
          }}
        ></View>

        <TextCustom
          style={{
            color: "#555555",
            fontSize: 13,
            fontWeight: "400",
            marginTop: 15,
            marginHorizontal: "3%",
          }}
        >
          REVIEWS
        </TextCustom>
        <View
          style={{
            marginHorizontal: "3%",
          }}
        >
          {reviews.length > 0 ? (
            <>
              <ScrollView
                style={{
                  flex: 1,
                  height: 200,
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {reviews.map((rev, i) => (
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      backgroundColor: "#F0F2F5",
                      borderWidth: 1,
                      marginRight: 10,
                      borderColor: "#E4E7EC",
                      padding: 10,
                      gap: 10,
                      width: 270,
                      height: 151,
                      borderRadius: 4,
                    }}
                    key={i}
                  >
                    <Avatar size={40} />
                    <View
                      style={{
                        width: "90%",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingRight: 10,
                          width: "90%",
                        }}
                      >
                        <Stars rating={rev?.rate} size={13} showNum={false} />
                        <Text
                          style={{
                            color: "#475367",
                            fontSize: 12,
                          }}
                        >
                          {epochToDate(rev?.created_at)}
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: "#101928",
                          fontSize: 16,
                          fontWeight: "900",
                          fontFamily: "Poppins_400Regular",
                          marginTop: 5,
                          marginBottom: 5,
                        }}
                      >
                        {rev?.reviewed_by?.given_name}{" "}
                        {rev?.reviewed_by?.family_name}
                      </Text>
                      <Text
                        style={{
                          color: "#101928",
                          fontSize: 12,
                          fontWeight: "400",
                          fontFamily: "Poppins_400Regular",
                        }}
                      >
                        {rev?.review}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <Pressable
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 10,
                }}
                onPress={() =>
                  navigation.navigate("ListReviewsScreen", {
                    id: data?.sk,
                  })
                }
              >
                <Text
                  style={{
                    color: COLORS.primary,
                    fontWeight: "600",
                  }}
                >
                  SEE ALL REVIEWS
                </Text>
              </Pressable>
            </>
          ) : (
            <View>
              <Text style={tw`text-[12px] text-[#888] ml-[0%]`}>
                No Reviews yet
              </Text>
            </View>
          )}
          <View
            style={{
              borderTopWidth: 1,
              borderColor: "#DADADA",
              marginVertical: 4,
              marginTop: 15,
            }}
          ></View>
          <TextCustom
            style={{
              color: "#555555",
              fontSize: 13,
              fontWeight: "400",
              marginTop: 20,
              fontFamily: "Poppins_400Regular",
            }}
          >
            HOSTED BY
          </TextCustom>

          <View
            style={{
              marginTop: 0,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 10,
              width: "100%",
              borderRadius: 4,
              marginBottom: 20,
            }}
          >
            <View style={{ paddingTop: 10 }}>
              <Avatar size={40} imgUri={data?.host?.logo} />
            </View>
            <View
              style={{
                width: "87%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    color: "#101928",
                    fontSize: 16,
                    fontWeight: "700",
                    marginTop: 10,
                    marginBottom: 5,
                  }}
                >
                  {data?.host?.name}
                </Text>
                <Stars rating={data?.host?.ratings} size={14} showNum={false} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <TextCustom
                  style={{
                    color: "#101928",
                    fontSize: 14,
                    fontWeight: "900",
                    fontFamily: "Poppins_400Regular",
                    marginBottom: 5,
                  }}
                >
                  {data?.host?.trips} trips |
                </TextCustom>
                <Text
                  style={{
                    color: "#101928",
                    fontSize: 14,
                    fontWeight: "900",
                    fontFamily: "Poppins_400Regular",
                    marginBottom: 5,
                  }}
                >
                  Joined {epochToDate(data?.host?.created_at)}
                </Text>
              </View>

              <Text
                style={{
                  color: "#101928",
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                {data?.host?.description}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={tw`w-[95%] mx-auto`}>
        <CustomButton
          disabled={!tripTime?.startDate || !tripTime?.endDate}
          onPress={() => {
            if (userStore?.id_token) {
              loadBookingsData();
              setBook(true);
            } else {
              toast("info", "You need to be logged in to book a ride.");
              delayFn(() => {
                navigation.navigate("AuthStart");
              }, 4000);
            }
          }}
          style={{ height: 40 }}
          label="Book ride"
        />
      </View>
    </ScreenWrapper>
  );
};

export default CarDetailComponent;
