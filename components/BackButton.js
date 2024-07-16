import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import tw from "twrnc";
const BackButton = ({
  type = 1,
  onPress,
  size = 36,
  bg = "#E4E7EC",
  iconColor,
}) => {
  return type === 1 ? (
    <TouchableOpacity
      style={[
        tw`w-[${size}px] h-[${size}px] rounded-full bg-[${bg}] flex items-center justify-center absolute left-[3%] android:top-[40px] ios:top-[80px]`,
        { zIndex: 100 },
      ]}
      onPress={onPress}
    >
      <Ionicons color={iconColor} size={size / 1.5} name="arrow-back" />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        tw`w-[${size}px] h-[${size}px] rounded-full bg-[${bg}] flex items-center justify-center  left-[3%] `,
        { zIndex: 100 },
      ]}
      onPress={onPress}
    >
      <Ionicons color={iconColor} size={size / 1.5} name="arrow-back" />
    </TouchableOpacity>
  );
};

export default BackButton;
