import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { COLORS } from "../utils/colors";

const SwitchCustom = ({
  switchFn = () => {},
  state = false,
  activeColor = COLORS.green,
  inactiveColor = COLORS.lighterGrey,
}) => {
  const [sw, setSW] = useState(state);

  return (
    <Pressable
      style={{
        backgroundColor: sw ? inactiveColor : "#ddd",
        height: 13,
        width: 40,
        borderRadius: 20,
        position: "relative",
      }}
      onPress={() => {
        switchFn(!sw);
        setSW(!sw);
      }}
    >
      <View
        style={{
          backgroundColor: activeColor,
          width: 20,
          height: 14,
          borderRadius: 10,
          position: "absolute",
          left: sw ? "50%" : 0,
          top: -0,
        }}
      />
    </Pressable>
  );
};

export default SwitchCustom;
