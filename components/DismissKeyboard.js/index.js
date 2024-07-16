import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";

const DismissKeyboard = ({ children }) => {
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}
    >
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
