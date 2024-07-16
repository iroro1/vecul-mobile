import React from "react";
import { Text } from "react-native";
const CustomText = ({
  content = "",
  fw = "400",
  fs = 12,
  color = "#2D2D2D",
  allowFontScaling = false,
}) => {
  return (
    <Text
      style={{
        fontSize: fs,
        color: color,
        fontWeight: fw,
        fontFamily: "Poppins_400Regular",
      }}
      allowFontScaling={allowFontScaling}
    >
      {content}
    </Text>
  );
};

export default CustomText;
