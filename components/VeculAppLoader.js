import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import LottieView from "lottie-react-native";

const VeculAppLoader = ({ size = 150 }) => {
  return (
    <View style={tw`w-full h-full flex-1 justify-center items-center`}>
      <LottieView
        loop={true}
        autoPlay
        style={{
          width: size,
          height: size,
        }}
        source={require("../assets/lottie/loader.json")}
      />
    </View>
  );
};

export default VeculAppLoader;
