import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import { fontsPoppins } from "../utils/fonts";
const TextCustom = ({ children, twClasses, style, fontFamily }) => {
  return (
    <Text style={[tw`${twClasses}`, { ...style, fontFamily: fontFamily }]}>
      {children}
    </Text>
  );
};

export default TextCustom;
