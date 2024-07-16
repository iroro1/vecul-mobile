import { View, Text } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { COLORS } from "../utils/colors";
import OutsidePressHandler from "react-native-outside-press";

const InfoCircle = ({
  content = "ABC",
  width = "100px",
  height = "40px",
  size = 14,
  fs = 12,
  textAlign = "center",
  bg,
  color,
  iconColor,
}) => {
  const [shw, setShw] = useState(false);
  return (
    <View style={tw`relative z-[99]`}>
      <OutsidePressHandler onOutsidePress={() => setShw(false)}>
        {shw && (
          <View
            style={tw`absolute w-[${width}] h-[${height}] bg-[${
              bg || COLORS.white
            }] border border-[#ddd] left-3 bottom-[5px] p-1  rounded-[6px]`}
          >
            <Text
              style={
                (tw` text-[${fs}]`,
                {
                  textAlign,
                  color: color || COLORS.greyDark,
                  fontSize: fs,
                })
              }
            >
              {content}
            </Text>
          </View>
        )}
        <Ionicons
          name="information-circle-outline"
          color={iconColor || COLORS.primary}
          onPress={() => setShw(!shw)}
          size={size}
        />
      </OutsidePressHandler>
    </View>
  );
};

export default InfoCircle;
