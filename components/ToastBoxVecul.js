import React from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { toastConfig } from "../hooks/useToast";

const ToastBoxVecul = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
      }}
    >
      <Toast config={toastConfig} />
    </View>
  );
};

export default ToastBoxVecul;
