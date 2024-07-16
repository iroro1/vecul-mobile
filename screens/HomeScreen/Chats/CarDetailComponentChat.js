import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import Avatar from "../../../components/Avatar";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import Stars from "../../../components/Stars";
import useHelperFunctions from "../../../hooks/useHelperFunctions";
import useShare from "../../../hooks/useShare";
import { addEllipses, capitalize } from "../../../utils";
import { COLORS } from "../../../utils/colors";
import TimePickertransparent from "../../../components/TimePickertransparent";

const CarDetailComponentChat = ({ modal, data, setModal, navigation }) => {
  const { setFavorite } = useHelperFunctions();
  const { onShare } = useShare();
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [book, setBook] = useState(false);
  const [tripTime, setTripTiime] = useState(0);

  const handlePageSelected = (event) => {
    // The 'event.nativeEvent.position' gives you the current index
    setIndex(event.nativeEvent.position);
  };

  const ownersConditions = [
    "Driver should be at least 25 years of age with at least 2 years of driving experience.",
    "There are no pets allowed in the car.",
  ];
  const reviews = [
    {
      id: 1,
      rating: 5,
      name: "Kimberly",
      feedback:
        "Lorem ipsum dolor sit amet consectetur. Ut consectetur mauris sit sed et sit felis ante.",
      date: "12/04/2024",
    },
    {
      id: 2,
      rating: 4,
      name: "Kimberly",
      feedback:
        "Lorem ipsum dolor sit amet consectetur. Ut consectetur mauris sit sed et sit felis ante.",
      date: "12/04/2024",
    },
    {
      id: 3,
      rating: 1,
      name: "Kimberly",
      feedback:
        "Lorem ipsum dolor sit amet consectetur. Ut consectetur mauris sit sed et sit felis ante.",
      date: "12/04/2024",
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        minHeight: "100%",
        position: "relative",
        width: "100%",
        backgroundColor: "#fff",
      }}
    >
      <Modal visible={modal !== ""} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            padding: "3%",
            paddingTop: 60,
          }}
        >
          <Ionicons
            onPress={() => setModal("")}
            name="close"
            color={"#fff"}
            size={25}
            style={{
              marginTop: 30,
            }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "400",
              marginTop: 20,
              fontFamily: "Poppins_400Regular",
            }}
          >
            {data?.car_name}
          </Text>
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
              right: 10,
              top: 120,
            }}
          >
            <Text
              style={{
                color: "#475367",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              {index + 1} of {data?.vehicle_images.length}
            </Text>
          </View>
          <PagerView
            style={{
              flex: 1,
              marginTop: "20%",
            }}
            initialPage={0}
            overdrag
            scrollEnabled
            onPageSelected={handlePageSelected}
          >
            {data?.vehicle_images.map((item, i) => (
              <Pressable key={i}>
                <Image
                  style={{
                    height: 263,
                    width: "100%",
                    resizeMode: "cover",
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
              height: "60%",
            }}
            onPress={() => setBook(false)}
          ></Pressable>
          <View
            style={{
              height: "40%",
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
                fontSize: 24,
              }}
            >
              Booking Summary
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: "3%",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  fontSize: 18,
                  color: "#667185",
                }}
              >
                Amount/Day
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  fontSize: 18,
                }}
              >
                ₦3000
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: "3%",
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  fontSize: 18,
                  color: "#667185",
                }}
              >
                Trip Duration
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  fontSize: 18,
                }}
              >
                5 days
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: "3%",
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  fontSize: 18,
                  color: "#667185",
                }}
              >
                KYC Verification Charge
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  fontSize: 18,
                }}
              >
                ₦300
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: "3%",
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  fontSize: 18,
                  color: "#667185",
                }}
              >
                Total to be paid
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  fontSize: 18,
                }}
              >
                ₦15,300
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                position: "absolute",
                bottom: 40,
                gap: 15,
              }}
            >
              <CustomButton
                Icon={<Ionicons size={20} name="arrow-back" />}
                style={{
                  width: 119,
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
                  width: 219,
                }}
                label="Continue"
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
      </Modal>
      <MotiView
        from={{ opacity: 0 }}
        animate={{
          opacity: 1,
          backgroundColor: "#fff",
          flex: 1,
          height: "100%",
          position: "relative",
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          delay: 200,
        }}
      >
        <View
          style={{
            height: 240,
            position: "relative",
          }}
        >
          <View
            style={{
              position: "absolute",
              zIndex: 900,
              top: 10,
              left: 10,
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
              zIndex: 900,
              right: 50,
              top: 10,
            }}
            onPress={() =>
              onShare(
                `Checkou this great deal on vecul.co. You can drive this car today. look up the availability on the app`,
                `myexpodeeplink://cars?param=${JSON.stringify(data)}`
              )
            }
          >
            <Ionicons
              color={"#344054"}
              name={"share-social-outline"}
              size={16}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 32,
              height: 32,
              backgroundColor: "#F0F2F5",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: 900,
              right: 10,
              top: 10,
            }}
            onPress={() =>
              setFavorite(data?.isLiked === undefined ? true : false)
            }
          >
            <Ionicons
              color={data?.isLiked ? COLORS.red : "#344054"}
              name={data?.isLiked ? "heart" : "heart-outline"}
              size={16}
            />
          </TouchableOpacity>

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
              left: 10,
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
              {index + 1} of {data?.vehicle_images.length}
            </Text>
          </View>
          <PagerView
            style={{
              flex: 1,
            }}
            initialPage={0}
            overdrag
            scrollEnabled
            onPageSelected={handlePageSelected}
          >
            {data?.vehicle_images.map((item, i) => (
              <Pressable
                onPress={() => (modal === "" ? setModal(item) : setModal(""))}
                key={i}
              >
                <Image
                  style={{
                    height: 234,
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
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: "2%",
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
                {data?.rating || 0} ({data?.trips || 0} trips)
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
              ₦{data?.price} /day
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: "3%",
              alignItems: "center",
              position: "relative",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: "101928",
                fontSize: 18,
                fontWeight: "800",
                textAlign: "center",
                position: "absolute",
                left: 8,
                fontFamily: "Poppins_400Regular",
              }}
            >
              {data?.car_name} - {data?.year || "2023"}
            </Text>
            {data?.car_availabilty === "yes" ? (
              <View
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRadius: 10,
                  position: "absolute",
                  right: 10,
                  backgroundColor:
                    data?.car_availabilty === "yes"
                      ? "#E7F6EC"
                      : COLORS.red + "20",
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    color:
                      data?.car_availabilty === "yes" ? "#0F973D" : COLORS.red,
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
                  borderColor:
                    data?.car_availabilty === "yes" ? COLORS.green : COLORS.red,
                  borderWidth: 1,
                  backgroundColor:
                    data?.car_availabilty === "yes"
                      ? COLORS.green + "20"
                      : COLORS.red + "20",
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    color:
                      data?.car_availabilty === "yes"
                        ? COLORS.green
                        : COLORS.red,
                  }}
                >
                  Not Available
                </Text>
              </View>
            )}
          </View>

          <Text
            style={{
              color: "#555555",
              fontSize: 13,
              fontWeight: "400",
              paddingHorizontal: "2%",
              marginTop: 50,
              fontFamily: "Poppins_400Regular",
            }}
          >
            TRIP DURATION
          </Text>

          <View
            style={{
              marginHorizontal: "3%",
              marginTop: 25,
            }}
          >
            <View
              style={{
                height: 46,
                position: "relative",
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#C2C2C2",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
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
              <Text style={{ color: "#101928", marginLeft: 34 }}>
                {tripTime?.startDate || "12 February, 2024"}
              </Text>
              <Text style={{ color: "#101928", marginRight: 8 }}>
                at {tripTime?.startTime || "10:30 PM"}
              </Text>
              <View
                style={{
                  opacity: 0,
                  position: "absolute",
                  backgroundColor: "red",
                  width: "100%",
                  zIndex: 100,
                }}
              >
                <TimePickertransparent
                  dateFn={(e) => {
                    const arr = e.split(" ");
                    const date = arr[0].split(",")[0];
                    const amPm = e
                      .split(" ")[1]
                      .slice(
                        e.split(" ")[1].length - 2,
                        e.split(" ")[1].length
                      );
                    const time =
                      arr[1].split(":")[0] +
                      ":" +
                      arr[1].split(":")[1] +
                      " " +
                      amPm;

                    setTripTiime({
                      ...tripTime,
                      startDate: date,
                      startTime: time,
                    });
                  }}
                  showLabel
                  placeholder={""}
                  mode="datetime"
                />
              </View>
            </View>

            <View
              style={{
                height: 46,
                position: "relative",
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "#C2C2C2",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 40,
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
              <Text style={{ color: "#101928", marginLeft: 34 }}>
                {tripTime?.endDate || "12 February, 2024"}
              </Text>
              <Text style={{ color: "#101928", marginRight: 8 }}>
                at {tripTime?.endTime || "10:30 PM"}
              </Text>
              <View
                style={{
                  opacity: 0,
                  position: "absolute",
                  backgroundColor: "red",
                  width: "100%",
                  zIndex: 100,
                }}
              >
                <TimePickertransparent
                  dateFn={(e) => {
                    const arr = e.split(" ");
                    const date = arr[0].split(",")[0];
                    const amPm = e
                      .split(" ")[1]
                      .slice(
                        e.split(" ")[1].length - 2,
                        e.split(" ")[1].length
                      );
                    const time =
                      arr[1].split(":")[0] +
                      ":" +
                      arr[1].split(":")[1] +
                      " " +
                      amPm;

                    setTripTiime({
                      ...tripTime,
                      endDate: date,
                      endTime: time,
                    });
                  }}
                  showLabel
                  placeholder={""}
                  mode="datetime"
                />
              </View>
            </View>
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: "#DADADA",
              marginTop: 30,
              marginHorizontal: "3%",
            }}
          ></View>
          <Text
            style={{
              color: "#555555",
              fontSize: 13,
              fontWeight: "400",
              paddingHorizontal: "2%",
              marginTop: 23,
              fontFamily: "Poppins_400Regular",
            }}
          >
            DESCRIPTION
          </Text>

          <View style={{ position: "relative" }}>
            <Text
              style={{
                color: "#383838",
                fontSize: 13,
                fontWeight: "400",
                paddingHorizontal: "2%",
                fontFamily: "Poppins_400Regular",
              }}
            >
              {showMore
                ? data?.rental_description
                : addEllipses(data?.rental_description, 130, 3)}{" "}
              <Pressable
                onPress={() => setShowMore(!showMore)}
                style={{ paddingLeft: 10 }}
              >
                <Text
                  style={{
                    color: "#1038C3",
                    fontSize: 13,
                  }}
                >
                  {showMore ? "Hide" : "Read More"}
                </Text>
              </Pressable>
            </Text>
          </View>

          <View
            style={{
              borderTopWidth: 1,
              borderColor: "#DADADA",
              marginTop: 30,
              marginHorizontal: "3%",
            }}
          ></View>
          <Text
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
          </Text>
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
                source={require("../../../assets/icons/gear.png")}
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
                {data?.car_features?.gearType || "Automatic"}
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 15, height: 20 }}
                source={require("../../../assets/icons/seats.png")}
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
                {data?.car_features?.seats} seats
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 15, height: 20 }}
                source={require("../../../assets/icons/doors.png")}
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
                {data?.car_features?.doors} doors
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 15, height: 20 }}
                source={require("../../../assets/icons/fuelType.png")}
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
                {capitalize(data?.car_features?.fuel)}
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
          <Text
            style={{
              color: "#555555",
              fontSize: 13,
              fontWeight: "400",
              paddingHorizontal: "2%",
              marginTop: 15,
              fontFamily: "Poppins_400Regular",
            }}
          >
            OTHER FEATURES
          </Text>
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
            {data?.car_features?.air_condition === "yes" && (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 15, height: 20 }}
                  source={require("../../../assets/icons/ac.png")}
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
            {data?.car_features?.bluetooth === "yes" && (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 15, height: 20 }}
                  source={require("../../../assets/icons/bluethoot.png")}
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
            {data?.car_features?.aux === "yes" && (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 15, height: 20 }}
                  source={require("../../../assets/icons/aux.png")}
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
            {data?.car_features?.applePlay === "yes" && (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 15, height: 20 }}
                  source={require("../../../assets/icons/applePlay.png")}
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
            {data?.car_features?.androidPlay === "yes" && (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 15, height: 20 }}
                  source={require("../../../assets/icons/applePlay.png")}
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
            {data?.car_features?.usbCharger === "yes" && (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 15, height: 20 }}
                  source={require("../../../assets/icons/usbCharger.png")}
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
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 15, height: 20 }}
                source={require("../../../assets/images/airbag.png")}
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
          <Text
            style={{
              color: "#555555",
              fontSize: 13,
              fontWeight: "400",
              paddingHorizontal: "2%",
              fontFamily: "Poppins_400Regular",
              marginTop: 15,
            }}
          >
            OWNER'S CONDITIONS
          </Text>
          <View
            style={{
              marginHorizontal: "3%",
              marginTop: 8,
            }}
          >
            {ownersConditions.map((condition) => (
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <Ionicons size={20} color={"#0F973D"} name="checkmark-circle" />
                <Text
                  style={{
                    fontSize: 13,
                    color: "#101928",
                  }}
                >
                  {condition}
                </Text>
              </View>
            ))}
          </View>
          <View
            style={{
              borderTopWidth: 1,
              borderColor: "#DADADA",
              marginTop: 15,
              marginHorizontal: "3%",
            }}
          ></View>

          <Text
            style={{
              color: "#555555",
              fontSize: 13,
              fontWeight: "400",
              paddingHorizontal: "2%",
              fontFamily: "Poppins_400Regular",
              marginTop: 15,
            }}
          >
            REVIEWS
          </Text>
          <View
            style={{
              paddingHorizontal: "3%",
            }}
          >
            <PagerView
              style={{
                flex: 1,
                height: 200,
              }}
              initialPage={0}
              overdrag
              scrollEnabled
              pageMargin={20}
            >
              {reviews.map((rev) => (
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    backgroundColor: "#E4E7EC40",
                    borderWidth: 1,
                    borderColor: "#E4E7EC",
                    padding: 15,
                    gap: 10,
                    width: "100%",
                    borderRadius: 4,
                  }}
                  key={rev.id}
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
                      }}
                    >
                      <Stars rating={rev?.rating} size={25} showNum={false} />
                      <Text
                        style={{
                          color: "#475367",
                        }}
                      >
                        {rev?.date}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: "#101928",
                        fontSize: 18,
                        fontWeight: "900",
                        fontFamily: "Poppins_400Regular",
                        marginTop: 10,
                        marginBottom: 5,
                      }}
                    >
                      {rev?.name}
                    </Text>
                    <Text
                      style={{
                        color: "#101928",
                        fontSize: 14,
                        fontWeight: "400",
                        fontFamily: "Poppins_400Regular",
                      }}
                    >
                      {rev?.feedback}
                    </Text>
                  </View>
                </View>
              ))}
            </PagerView>
            <Pressable
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 10,
              }}
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

            <View
              style={{
                borderTopWidth: 1,
                borderColor: "#DADADA",
                marginVertical: 4,
                marginTop: 15,
              }}
            ></View>
            <Text
              style={{
                color: "#555555",
                fontSize: 13,
                fontWeight: "400",
                marginTop: 40,
                fontFamily: "Poppins_400Regular",
              }}
            >
              HOSTED BY
            </Text>

            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                padding: 15,
                gap: 10,
                width: "100%",
                borderRadius: 4,
                marginBottom: 20,
              }}
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
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#101928",
                      fontSize: 18,
                      fontWeight: "900",
                      fontFamily: "Poppins_400Regular",
                      marginTop: 10,
                      marginBottom: 5,
                    }}
                  >
                    Meek Millz
                  </Text>
                  <Stars rating={5} size={25} showNum={false} />
                </View>
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
                      fontSize: 15,
                      fontWeight: "900",
                      fontFamily: "Poppins_400Regular",
                      marginBottom: 5,
                    }}
                  >
                    120 trips |
                  </Text>
                  <Text
                    style={{
                      color: "#101928",
                      fontSize: 15,
                      fontWeight: "900",
                      fontFamily: "Poppins_400Regular",
                      marginBottom: 5,
                    }}
                  >
                    Joined Dec 2021
                  </Text>
                </View>

                <Text
                  style={{
                    color: "#101928",
                    fontSize: 14,
                    fontWeight: "400",
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  We pride ourselves in providing access to the most exquisite
                  car options for any experience our renters might have. We
                  respond almost immediately and care about our customers. So
                  why don't you pick one of our available cars and send a dm
                  today ✌️
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </MotiView>
    </SafeAreaView>
  );
};

export default CarDetailComponentChat;
