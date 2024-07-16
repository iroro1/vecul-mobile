import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { COLORS } from "../utils/colors";

const Avatar = ({ imgUri, styles, size = 30, onPress }) => {
  return imgUri ? (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,

          ...styles,
        }}
        src={imgUri}
      />
    </TouchableOpacity>
  ) : (
    <Ionicons
      name="person-circle-outline"
      size={size}
      color={COLORS.greyDark}
      onPress={onPress}
    />
  );
};

export default Avatar;
