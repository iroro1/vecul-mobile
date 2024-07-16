import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { capitalize } from "../utils";
import { COLORS } from "../utils/colors";
import { baseMediaUrl, carBrandsAndImages } from "../utils/dataList";

const CarPicker = ({
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
  onBlur = () => {},
  err,
  RIcon,
  bgColor = "#fff",
}) => {
  const [showDD, setShowDD] = useState(false);

  return (
    <View
      style={{
        width: "100%",
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
            {capitalize(label)}{" "}
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
        onPress={() => {
          setShowDD(!showDD);
          !showDD && onBlur();
        }}
        style={{
          position: "relative",
          backgroundColor: bgColor,
        }}
      >
        <Text
          style={{
            borderColor: err ? COLORS.red : borderColor,
            borderWidth: 1,
            fontSize: fs,
            color: value ? inputTextColor : "#9A9FAC" || labelColor,
            borderRadius: 5,
            height,
            padding: 9,
            marginTop: 8,
            paddingTop: 15,
          }}
          allowFontScaling={false}
          maxLength={maxEntry}
          value={value}
          keyboardType={keyType}
          editable={!disabled}
          selectTextOnFocus={!disabled}
        >
          {capitalize(value) || placheHolder}
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
            }}
          >
            {carBrandsAndImages.map((itm, key) => (
              <TouchableOpacity
                key={key}
                style={{
                  height: 60,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "#dee",
                  flexDirection: "row",
                  gap: 20,
                }}
                onPress={() => {
                  onChange(itm);
                  setShowDD(false);
                }}
              >
                <Image
                  source={{
                    uri: baseMediaUrl + itm.logo + ".png",
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                    // backgroundColor: "red",
                    borderRadius: 8,
                  }}
                />
                <Text>{capitalize(itm.brand)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default CarPicker;
