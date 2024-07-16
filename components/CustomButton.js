import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../utils/colors";

const CustomButton = ({
  label = "Sign in/up",
  onPress,
  style,
  textStyles,
  disabled = false,
  loading,
  fw = "400",
  Icon,
  IconR,
  loaderColor = "#fff",
}) => {
  return (
    <TouchableOpacity
      onPress={() => (disabled ? () => {} : onPress())}
      style={{
        backgroundColor: disabled ? "#D0D5DD" : COLORS.primary,
        height: 53,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "row",
        gap: 4,
        ...style,
      }}
    >
      {Icon}
      <Text
        style={{
          color: "#fff",
          fontWeight: fw,
          fontSize: 14,
          fontFamily: "Poppins_400Regular",
          alignItems: "center",
          ...textStyles,
        }}
      >
        {label}
      </Text>
      {loading && (
        <ActivityIndicator style={{ marginLeft: 10 }} color={loaderColor} />
      )}
      {IconR}
    </TouchableOpacity>
  );
};

export default CustomButton;
