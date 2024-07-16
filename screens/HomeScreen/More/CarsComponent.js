import React, { useState } from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";
import CustomButton from "../../../components/CustomButton";
import Stars from "../../../components/Stars";
import { COLORS } from "../../../utils/colors";
import Swiper from "react-native-swiper";
import { Ionicons } from "@expo/vector-icons";

const CarsComponent = ({ data, type = "rent", detailFn }) => {
  const [showFull, setShowFull] = useState(false);
  const [modal, setModal] = useState("");

  const colorPicker = (txt) => {
    if (txt?.toLowerCase()?.includes("rental session")) {
      return COLORS.green;
    } else if (txt?.toLowerCase()?.includes("unavailable")) {
      return COLORS.red;
    } else return COLORS.primary;
  };

  return (
    <View
      style={{
        height: 214,
        backgroundColor: "#F5F5F5",
        marginHorizontal: "3%",
        position: "relative",
        marginBottom: 14,
        width: "94%",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <Modal style={{}} visible={modal !== ""} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            padding: "3%",
          }}
        >
          <Ionicons
            onPress={() => setModal("")}
            name="close"
            color={"#fff"}
            size={30}
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
            }}
          >
            {data?.car_name}
          </Text>
          <Swiper
            style={{
              marginTop: 80,
              height: "100%",
              backgroundColor: "#000",
            }}
            showsButtons={false}
            loop
            showsPagination={false}
          >
            {data?.vehicle_images.map((item, i) => (
              <Pressable key={i}>
                <Image
                  resizeMode="cover"
                  style={{
                    height: "80%",
                    width: "100%",
                    resizeMode: "cover",
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                  }}
                  src={item}
                />
              </Pressable>
            ))}
          </Swiper>
        </View>
      </Modal>
      <View
        style={{
          paddingHorizontal: 22,
          paddingVertical: 6,
          backgroundColor: "#F0F0F0",
          borderRadius: 19,
          position: "absolute",
          zIndex: 4,
          right: 10,
          top: 10,
        }}
      >
        {type === "rent" ? (
          <Text
            style={{
              color: data?.daysLeft?.toLowerCase()?.includes("ended")
                ? COLORS.red
                : COLORS.primary,
              fontWeight: "500",
              fontSize: 14,
            }}
          >
            {data?.daysLeft || 0}
          </Text>
        ) : (
          <Text
            style={{
              color: colorPicker(data?.car_availabilty),
              fontWeight: "500",
              fontSize: 14,
            }}
          >
            {data?.car_availabilty === "yes" ? "Available" : "Unavailable"}
          </Text>
        )}
      </View>
      <Swiper
        style={{
          height: 170,
        }}
        showsButtons={false}
        loop
        showsPagination={false}
      >
        {data?.vehicle_images.map((item, i) => (
          <Pressable
            onPress={() => (modal === "" ? setModal(item) : setModal(""))}
            key={i}
          >
            <Image
              resizeMode="cover"
              style={{
                height: 160,
                width: "100%",
                borderTopLeftRadius: 14,
                borderTopRightRadius: 14,
              }}
              src={item}
            />
          </Pressable>
        ))}
      </Swiper>
      <Pressable onPress={() => detailFn(data)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 14,
            paddingBottom: 8,
            height: 48,
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
                color: "#3F3D56",
                fontSize: 13,
                fontWeight: "400",
              }}
            >
              {data?.car_name}
            </Text>
            <Stars showNum={false} size={15} rating={data?.rating || 0} />
          </View>
          <View>
            <Text
              style={{
                color: "#3F3D56",
                fontSize: 13,
                fontWeight: "400",
              }}
            >
              N{data?.price} /day
            </Text>
            <Text
              style={{
                color: "#3F3D56",
                fontSize: 13,
                fontWeight: "400",
                textDecorationLine: "line-through",
                textDecorationStyle: "solid",
                textDecorationColor: "#3F3D56",
              }}
            >
              {" "}
              N{data?.price}
            </Text>
          </View>
        </View>
        {showFull && (
          <View
            style={{
              width: "100%",
              paddingHorizontal: "3%",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "#3F3D56",
                fontSize: 13,
                fontWeight: "400",
              }}
            >
              {data?.rental_description}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <CustomButton
                style={{
                  height: 34,
                  width: 152,
                  borderRadius: 17,
                  marginTop: 15,
                }}
                label="Rent"
                onPress={detailFn(data)}
              />
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default CarsComponent;
