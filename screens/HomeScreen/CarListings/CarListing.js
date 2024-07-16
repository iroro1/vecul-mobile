import { GOOGL_MAPS_API_KEY } from "@env";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import { useSelector } from "react-redux";
import tw from "twrnc";
import VeculAppLoader from "../../../components/VeculAppLoader";
import { getCarByIdApi } from "../../../services/coreService";
import { likeCarApi } from "../../../services/favoriteService";
import { authSelector } from "../../../store/appSlice";
import { capitalize, currencyPipe, removeSeparators } from "../../../utils";
import { COLORS } from "../../../utils/colors";
import useRefreshToken from "../../../hooks/useRefreshToken";

const CarListing = ({
  data,
  dual = false,
  showFav = true,
  showLocation = true,
  authState,
  authFn = () => {},
  type = 1,
  onChangeike = () => {},
}) => {
  const nav = useNavigation();
  const [modal, setModal] = useState("");
  const rentCarFn = async () => {
    nav.navigate("CarDetail", { data });
  };
  const windowWidth = Dimensions.get("window").width - 80;
  const [index, setIndex] = useState(0);
  const [load, setLoad] = useState(true);
  const [carData, setCarData] = useState({});

  const [liked, setLiked] = useState(false);
  const userStore = useSelector(authSelector);

  useEffect(() => {}, [liked]);
  const handlePageSelected = (event) => {
    setIndex(event.nativeEvent.position);
  };

  const carLoopFn = () => {
    if (carData?.vehicle_images) return carData?.vehicle_images;
    else return carData?.car_pictures;
  };
  const { callRefresh } = useRefreshToken();
  const likeFn = async () => {
    setLoad(true);
    await callRefresh();

    if (authState) {
      try {
        const res = await likeCarApi(
          {
            car_id: data,
            like: !carData?.liked,
          },
          userStore?.id_token
        );
        if (res?.data?.success) {
          setLiked(!carData?.liked);
          loadDetail();
          onChangeike();
        } else if (res?.response?.status === 401) {
          // likeFn();
        } else {
          setLiked(carData?.liked);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      authFn(authState);
    }

    setLoad(false);
  };

  const [addy, setAddy] = useState({});

  const getLoc = () => {
    const apiKey = GOOGL_MAPS_API_KEY;
    const lat = data?.car_address?.latitude;
    const lng = data?.car_address?.longitude;
    const radius = 100; // in meters

    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        //
        setAddy(data?.results[0]);
      })
      .catch((error) => {
        console.error("Error fetching nearby places:", error);
      });
  };

  const loadDetail = async () => {
    setLoad(true);
    const obj = authState
      ? {
          car_id: data,
          user_id: userStore?.sub,
        }
      : {
          car_id: data,
        };
    try {
      const res = await getCarByIdApi(obj, userStore?.id_token);
      if (res?.status === 200) {
        setCarData(res?.data?.data?.car);
        setLiked(res?.data?.data?.car?.liked);
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
    getLoc();
  }, []);

  return (
    <View
      style={{
        minHeight: 291,
        backgroundColor: "#fff",
        marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",
        position: "relative",
        marginBottom: 14,
        width: Platform.OS === "ios" ? "94%" : "100%",
        borderRadius: 8,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E4E7EC",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
      }}
    >
      <Modal style={{}} visible={modal !== ""} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            padding: "3%",
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
              top: 80,
            }}
          >
            <Ionicons
              onPress={() => setModal("")}
              name="close"
              color={"#fff"}
              size={30}
            />
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "400",
              }}
            >
              {data?.car_brand &&
                capitalize(removeSeparators(data?.car_brand, "-"))}
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
                right: 0,
                top: 50,
              }}
            >
              <Text
                style={{
                  color: "#475367",
                  fontSize: 12,
                  fontWeight: "500",
                  // fontFamily: "Poppins_400Regular",
                }}
              >
                {index + 1} of{" "}
                {data?.vehicle_images
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

      {load ? (
        <View
          style={tw`min-h-[100%] w-full bg-[#00000010] absolute top-0 left-0 z-99`}
        >
          <VeculAppLoader size={30} />
        </View>
      ) : (
        <>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: carData?.promoted && "#80BBFF30",
            }}
            onPress={() => {
              // carData?.status !== "pending_review" && rentCarFn();
            }}
          >
            {carData?.status === "pending_review" && (
              <View
                style={{
                  height: "100%",
                  backgroundColor: "#00000090",
                  position: "absolute",
                  marginBottom: 14,
                  width: "100%",
                  borderRadius: 8,
                  zIndex: 80,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={tw`w-[212px] h-[28px] bg-[#fff] rounded-[34px] justify-center items-center`}
                >
                  <Text
                    style={tw`text-[#475367] text-[14px] font-[Poppins_400Regular]`}
                  >
                    Vehicle will be available soon
                  </Text>
                </View>
              </View>
            )}
            {showFav && (
              <TouchableOpacity
                style={{
                  backgroundColor: "#fff",
                  height: 30,
                  width: 30,
                  borderRadius: 8,
                  position: "absolute",
                  zIndex: 100,
                  right: 15,
                  top: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  onPress={() => {
                    if (!authState) {
                      nav.navigate("AuthStart");
                    } else {
                      !load && likeFn();
                    }
                    //
                  }}
                  color={liked ? COLORS.red : "#344054"}
                  name={liked ? "heart" : "heart-outline"}
                  size={20}
                />
              </TouchableOpacity>
            )}
            {showLocation && (
              <Pressable
                style={{
                  backgroundColor: "#fff",
                  height: 24,
                  borderRadius: 8,
                  position: "absolute",
                  zIndex: 10,
                  left: 15,
                  top: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  flexDirection: "row",
                  gap: 4,
                  elevation: 2,
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
                <Text
                  style={{
                    color: "#475367",
                    fontSize: 12,
                    // fontFamily: "Poppins_400Regular",
                  }}
                >
                  {`${capitalize(carData?.car_address?.city)} ,`}
                </Text>
                <Text
                  style={{
                    color: "#475367",
                    fontSize: 12,
                    // fontFamily: "Poppins_400Regular",
                  }}
                >
                  {`${
                    addy?.name
                      ? addy?.name
                      : capitalize(carData?.car_address?.state)
                  }` || "N/A"}
                </Text>
              </Pressable>
            )}

            <PagerView
              style={{
                backgroundColor: COLORS.lighterGrey,
                height: 225,
                minWidth: "100%",
              }}
              initialPage={0}
              overdrag
              scrollEnabled
              onPageSelected={handlePageSelected}
            >
              {carData?.car_pictures?.map((item, i) => (
                <Pressable
                  onPress={() => {
                    // type !== 1
                    //   ? rentCarFn()
                    //   : modal === ""
                    //   ? setModal(item)
                    //   : setModal("")

                    carData?.status !== "pending_review" && rentCarFn();
                  }}
                  key={i}
                >
                  <Image
                    style={{
                      height: 225,
                      minWidth: "100%",
                      resizeMode: "cover",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                    src={item}
                  />
                </Pressable>
              ))}
            </PagerView>
            <View>
              {carData?.comes_with_driver && (
                <View
                  style={tw`w-[116px] h-[25px] z-99 bg-[#F3A218] rounded-[8px]  flex-row items-center px-2 bottom-[50px] left-3 gap-1`}
                >
                  <Ionicons name="person" color={"#fff"} />
                  <Text
                    style={tw`text-[#F9FAFB] text-[12px] font-[Poppins_400Regular]`}
                  >
                    Driver inclusive
                  </Text>
                </View>
              )}
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 14,
                paddingVertical: 8,
                height: "auto",
              }}
            >
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    color: "#101928",
                    fontSize: 16,
                    fontWeight: "600",
                    // fontFamily: "Poppins_400Regular",
                  }}
                >
                  {capitalize(removeSeparators(carData?.car_brand, "-")) ||
                    carData?.car_model}{" "}
                  - {carData?.car_year || "2003"}
                </Text>
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
                    color={carData?.rating_avg_value > 0 ? "#F3A218" : "#aaa"}
                    name="star"
                  />
                  <Text
                    style={{
                      color: "#344054",
                      fontSize: 12,
                      fontWeight: "400",
                      // fontFamily: "Poppins_400Regular",
                    }}
                  >
                    {+carData?.rating_avg_value || 0} ({carData?.trips || 0}{" "}
                    trips)
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "flex-end",
                  gap: 1,
                }}
              >
                <Text
                  style={{
                    color: "#3F3D56",
                    fontSize: 14,
                    fontWeight: "500",
                    // fontFamily: "Poppins_400Regular",
                  }}
                >
                  {currencyPipe(carData?.price)}{" "}
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",

                      // fontFamily: "Poppins_400Regular",
                    }}
                  >
                    /day
                  </Text>
                </Text>
                <Text
                  style={{
                    color: "#667185",
                    fontSize: 12,
                    fontWeight: "400",
                    textDecorationLine: carData?.previous_price
                      ? "line-through"
                      : "none",
                    textDecorationStyle: "solid",
                    textDecorationColor: "#667185",
                    // fontFamily: "Poppins_400Regular",
                  }}
                >
                  {" "}
                  {`${
                    +carData?.previous_price
                      ? currencyPipe(carData?.previous_price)
                      : " "
                  }`}
                </Text>
                {carData?.promoted && (
                  <View
                    style={{
                      backgroundColor: "#F56630",
                      height: 17,
                      width: 72,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        // fontFamily: "Poppins_400Regular",
                      }}
                    >
                      Promoted
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default CarListing;
