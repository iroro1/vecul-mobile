import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Tooltip } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";

const VeculToolTip = ({ message, iconColor = "#fff" }) => {
  const [open, setOpen] = useState(true);
  return (
    <Pressable
      visible={open}
      onPress={() => {
        setOpen(!open);
      }}
    >
      {open && (
        <View>
          <Text
            style={{
              color: "#fff",
            }}
          >
            {message}
          </Text>
        </View>
      )}
      <Ionicons name="information-circle-outline" size={14} color={iconColor} />
    </Pressable>
  );
};

export default VeculToolTip;
