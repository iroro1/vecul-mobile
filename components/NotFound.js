import { View, Text, Image } from "react-native";
import React from "react";

const NotFound = ({ title, subTitle, width, children }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}

      <Text
        style={{
          color: "#000000",
          fontWeight: "600",
          fontSize: 18,
          textAlign: "center",
          fontFamily: "Poppins_400Regular",
        }}
      >
        {title || "No rides found"}
      </Text>
      <Text
        style={{
          color: "#475367",
          fontSize: 14,
          fontWeight: "400",
          width: 314,
          textAlign: "center",
          fontFamily: "Poppins_400Regular",
        }}
      >
        {subTitle ||
          `There was no ride found for that matches your search query. Please
        modify your search and try again`}
      </Text>
    </View>
  );
};

export default NotFound;
