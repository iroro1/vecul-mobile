import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { useDispatch } from "react-redux";

const AvatarChat = ({
  imgUri = "https://t3.ftcdn.net/jpg/01/71/25/36/360_F_171253635_8svqUJc0BnLUtrUOP5yOMEwFwA8SZayX.jpg",
  isOnline,
  size = 70,
  showOnlineStatus = true,
  borderColor = "#ddd",
  borderWidth = 1,
  icon,
  iconColor = "#fa8254ff",
  brad = 35,
  iconR = -15,
  loading,
}) => {
  return loading ? (
    <View
      style={{
        position: "relative",
        height: size,
        width: size,
        borderRadius: brad,
        borderWidth,
        borderColor,
        backgroundColor: "#eee",
      }}
    />
  ) : (
    <Pressable
      style={{
        position: "relative",
        height: size,
        width: size,
        borderRadius: brad,
        borderWidth,
        borderColor,
      }}
      testID="avatar-pressable"
    >
      <View
        style={{
          borderRadius: brad,
          backgroundColor: "#fff",
          height: "100%",
          width: "100%",
        }}
      >
        <Image
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderWidth,
            borderColor: "#fff",
            borderRadius: brad,
          }}
          source={{
            uri:
              imgUri ||
              "https://t3.ftcdn.net/jpg/01/71/25/36/360_F_171253635_8svqUJc0BnLUtrUOP5yOMEwFwA8SZayX.jpg",
          }}
        />
      </View>
      {showOnlineStatus && !icon && (
        <View
          style={{
            height: 15,
            width: 15,
            borderRadius: brad / 2,
            position: "absolute",
            zIndex: 1000,
            backgroundColor: isOnline ? "#04802E" : "#aaa",
            right: -2,
            top: size / 1.5,
            borderWidth: 1,
            borderColor: "#fff",
          }}
        />
      )}
      {icon && (
        <View
          style={{
            height: size - 35,
            width: size - 35,
            borderRadius: brad / 2,
            position: "absolute",
            zIndex: 1000,
            backgroundColor: "#fff",
            right: iconR,
            top: size / 1.9,
            borderWidth: 1,
            borderColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name={icon} size={brad / 2.5} color={iconColor} />
        </View>
      )}
    </Pressable>
  );
};

export default AvatarChat;
