import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";

const Stars = ({ rating = 0, bold = false, showNum = true, size = 16 }) => {
  const arr = [1, 2, 3, 4, 5];

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 2,
        justifyContent: "flex-end",
        alignItems: "center",
      }}
      testID="starsContainer"
    >
      {arr.map((itm, i) => (
        <Ionicons
          color={i < Math.round(rating) ? "#F3A218" : "#bbb"}
          key={itm}
          size={size}
          name="star"
          testID={`starIcon-${i + 1}`}
        />
      ))}
      {showNum && (
        <Text
          style={{
            fontWeight: bold ? "700" : "500",
            marginLeft: 7,
            fontSize: size,
            color: !bold ? "#666" : "#000",
          }}
          allowFontScaling={false}
        >
          {parseFloat(+rating).toFixed(1) || "0"}
        </Text>
      )}
    </View>
  );
};

export default Stars;
