import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, Modal, Pressable, Text, View } from "react-native";
import PagerView from "react-native-pager-view";
import useAuth from "../../hooks/useAuth";
import { likeCarApi } from "../../services/favoriteService";
import { capitalize, removeSeparators } from "../../utils";
import { COLORS } from "../../utils/colors";
import useRefreshToken from "../../hooks/useRefreshToken";

const CarListing = (props) => {
  // const {
  //   data,
  //   dual = false,
  //   showFav = true,
  //   showLocation = true,
  //   authState,
  //   onChangeLike,
  //   authFn = () => {},
  // } = props;
  const dual = false;
  const showFav = true;
  const showLocation = true;
  const { isAuth: authState } = useAuth();
  const onChangeLike = () => {};
  const authFn = () => {};
  const data = props;
  const nav = useNavigation();
  const [modal, setModal] = useState("");
  const rentCarFn = async () => {
    if (authState)
      // data?.isAvailable
      nav.navigate("CarDetail", { data });
    else {
      authFn(authState);
    }
  };
  const windowWidth = Dimensions.get("window").width - 80;
  const [index, setIndex] = useState(0);
  const [load, setLoad] = useState(0);
  const [liked, setLiked] = useState(data?.liked);
  const { userData } = useAuth();

  useEffect(() => {}, [liked]);
  const handlePageSelected = (event) => {
    setIndex(event.nativeEvent.position);
  };

  const carLoopFn = () => {
    if (data?.vehicle_images) return data?.vehicle_images;
    else return data?.car_pictures;
  };
  const tk = userData;
  const { callRefresh } = useRefreshToken();
  const likeFn = async () => {
    setLoad(true);
    if (authState) {
      try {
        const res = await likeCarApi(
          {
            car_id: data?.sk,
            like: !data?.liked,
          },
          tk?.id_token
        );
        console.log(res, "CHEK", data?.liked);
        if (res?.data?.success) {
          onChangeLike();
          setLiked(!data?.liked);
        } else if (res?.response?.status === 401) {
          await callRefresh();
          // likeFn();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      authFn(authState);
    }

    setLoad(false);
  };
  console.log(props, "PRPS");

  return (
    <View
      style={{
        height: 291,
        backgroundColor: "#fff",
        marginHorizontal: "3%",
        position: "relative",
        marginBottom: 14,
        width: dual ? "45%" : "94%",
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
                fontSize: 18,
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

      <Pressable
        style={{ flex: 1, backgroundColor: data?.isPromoted && "#80BBFF30" }}
        onPress={() => {
          rentCarFn();
        }}
      >
        {showFav && (
          <Pressable
            style={{
              backgroundColor: "#fff",
              height: 24,
              width: 24,
              borderRadius: 8,
              position: "absolute",
              zIndex: 10,
              right: 15,
              top: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              onPress={() => {
                likeFn();
                //
              }}
              color={data?.liked ? COLORS.red : "#344054"}
              name={data?.liked ? "heart" : "heart-outline"}
              size={15}
            />
          </Pressable>
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
              paddingHorizontal: 4,
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
            <Text style={{ color: "#475367", fontSize: 12 }}>
              {`${data?.car_address?.city} ,`}
            </Text>
            <Text style={{ color: "#475367", fontSize: 12 }}>
              {`${data?.car_address?.state}` || "N/A"}
            </Text>
          </Pressable>
        )}

        <PagerView
          style={{
            flex: 1,
          }}
          initialPage={0}
          overdrag
          scrollEnabled
          onPageSelected={handlePageSelected}
        >
          {carLoopFn()?.map((item, i) => (
            <Pressable
              onPress={() => (modal === "" ? setModal(item) : setModal(""))}
              key={i}
            >
              <Image
                style={{
                  height: 225,
                  width: "100%",
                  resizeMode: "cover",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
                src={item}
              />
            </Pressable>
          ))}
        </PagerView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 14,
            paddingBottom: 8,
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
              }}
            >
              {capitalize(removeSeparators(data?.car_brand, "-")) ||
                data?.car_model}{" "}
              - {data?.car_year || "2003"}
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
          </View>
          <View
            style={{
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                color: "#3F3D56",
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              N{data?.price}{" "}
              <Text style={{ fontSize: 12, fontWeight: "400" }}>/day</Text>
            </Text>
            <Text
              style={{
                color: "#667185",
                fontSize: 12,
                fontWeight: "400",
                textDecorationLine: data?.previous_price
                  ? "line-through"
                  : "none",
                textDecorationStyle: "solid",
                textDecorationColor: "#667185",
                marginTop: 6,
              }}
            >
              {" "}
              {`${+data?.previous_price ? "N" + data?.previous_price : " "}`}
            </Text>
            {data?.isPromoted && (
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
                  }}
                >
                  Promoted
                </Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CarListing;
