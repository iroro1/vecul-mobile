import React, { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { capitalize, removeSeparators } from "../utils";
import { COLORS } from "../utils/colors";
import InputField from "./InputField";
import { Ionicons } from "@expo/vector-icons";

const DropDownWithSearch = ({
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
  textAlign,
}) => {
  const [showDD, setShowDD] = useState(false);
  const [innerData, setInnerData] = useState(data);

  const searchFn = (e) => {
    const arr = data.filter((itm) => {
      if (itm.toLowerCase().includes(e.toLowerCase())) return itm;
    });
    setInnerData(arr);
  };
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
          if (!disabled) {
            setShowDD(!showDD);
            !showDD && onBlur();
          }
        }}
        style={{
          position: "relative",
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
            backgroundColor: bgColor,
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
          <View>
            <InputField
              placheHolder="Search"
              label=""
              pl={35}
              onChange={(e) => {
                searchFn(e);
              }}
              LIcon={<Ionicons name="search" size={20} />}
            />
          </View>
          <ScrollView
            contentContainerStyle={{
              padding: 10,
              backgroundColor: "#fff",
            }}
          >
            {innerData?.map((itm, key) => (
              <TouchableOpacity
                key={key}
                style={{
                  height: 60,
                  justifyContent: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "#C2C2C2",
                }}
                onPress={() => {
                  onChange(itm);
                  setShowDD(false);
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "#2D2D2D",
                    fontWeight: "500",
                    textAlign,
                  }}
                >
                  {itm && capitalize(removeSeparators(itm, "-"))}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default DropDownWithSearch;
