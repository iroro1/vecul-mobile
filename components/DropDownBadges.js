import React, { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../utils/colors";
import { ScrollView } from "react-native-gesture-handler";

const DropDownBadges = ({
  label = "First Name",
  placheHolder = "",
  value,
  onChange,
  fs = 14,
  labelColor = "#333",
  borderColor = "#C2C2C2",
  inputTextColor,
  keyType,
  data = [],
  maxEntry,
  disabled,
  required,
  height = 46,
  heightDD = 40,
  RIcon,
  bgColor = "#fff",
  width = "100%",
}) => {
  const [showDD, setShowDD] = useState(false);

  return (
    <View
      style={{
        width: width,
        paddingRight: 5,
      }}
    >
      {label && (
        <View>
          <Text
            style={{
              fontSize: fs,
              color: labelColor,
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              position: "relative",
            }}
            allowFontScaling={false}
          >
            {label}{" "}
            {required && (
              <Text
                style={{
                  color: "#fa8254ff",
                }}
                allowFontScaling={false}
              >
                *
              </Text>
            )}{" "}
          </Text>
        </View>
      )}
      <Pressable
        style={{
          position: "relative",
          backgroundColor: bgColor,
        }}
        onPress={() => setShowDD(!showDD)}
      >
        <Text
          style={{
            borderColor: borderColor,
            borderWidth: 1,
            fontSize: fs,
            color: inputTextColor || labelColor,
            borderRadius: 5,
            height,
            padding: 9,
            marginTop: 8,
            paddingTop: 15,
          }}
          allowFontScaling={false}
          maxLength={maxEntry}
          value={value}
          placeholder={placheHolder}
          keyboardType={keyType}
          placeholderTextColor="#9A9FAC"
          editable={!disabled}
          selectTextOnFocus={!disabled}
        >
          {value || placheHolder}
        </Text>
        <View
          style={{
            position: "absolute",
            right: 10,
            top: height / 2,
          }}
        >
          {RIcon}
        </View>
      </Pressable>

      <Modal visible={showDD} transparent animationType="fade">
        <Pressable
          style={{ height: 100 - heightDD + "%", backgroundColor: "#000000aa" }}
          onPress={() => setShowDD(false)}
        />
        <View
          style={{
            padding: 10,
            height: heightDD + "%",
            backgroundColor: "#fff",
            zIndex: 100000,
            paddingTop: 30,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              padding: 10,
              backgroundColor: "#fff",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 20,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {data.map((itm, key) => (
              <TouchableOpacity
                key={key}
                style={{
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  // borderWidth: 1,
                  // borderColor: "#C2C2C2",
                  borderRadius: 8,
                }}
                onPress={() => {
                  onChange(itm);
                  setShowDD(false);
                }}
              >
                <Text
                  style={{ fontSize: 14, color: "#2D2D2D", fontWeight: "500" }}
                >
                  {itm}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default DropDownBadges;
