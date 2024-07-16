import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { COLORS } from "../../../utils/colors";

const SwitchForHostList = ({ switchFn = () => {}, state = false }) => {
  const [sw, setSW] = useState(state);

  return (
    <Pressable
      style={{
        backgroundColor: sw ? "#1671D9" : "#ddd",
        height: 20,
        width: 32.5,
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
          backgroundColor: "#fff",
          width: 18,
          height: 18,
          borderRadius: 10,
          position: "absolute",
          left: sw ? "40%" : 2,
          top: 1,
        }}
      />
    </Pressable>
  );
};

export default SwitchForHostList;
