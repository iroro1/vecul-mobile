import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const VCheckbox = ({
  onPress = () => {},
  iconSize = 20,
  bg = "tomato",
  bRad = 3,
  value = false,
  borderColor,
}) => {
  const [isTrue, setIsTrue] = useState(value);
  return (
    <Pressable
      style={{
        height: iconSize,
        width: iconSize,
        backgroundColor: isTrue ? bg : null,
        borderRadius: bRad,
        borderWidth: 1,
        borderColor: isTrue ? bg : bg + "40",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        setIsTrue(!isTrue);
        onPress(!isTrue);
      }}
    >
      {isTrue && (
        <Ionicons name="checkmark" color={"#fff"} size={iconSize - 8} />
      )}
    </Pressable>
  );
};

export default VCheckbox;
