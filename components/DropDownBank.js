import React, { useEffect, useState } from "react";
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
import { capitalize, removeSeparators } from "../utils";
import { banksInNig } from "../utils/dataList";
import InputField from "./InputField";
import { Ionicons } from "@expo/vector-icons";

const DropDownBank = ({
  label = "First Name",
  placheHolder = "",
  value,
  onChange,
  fs = 14,
  labelColor = "#333",
  borderColor = "#C2C2C2",
  inputTextColor,
  keyType,
  maxEntry,
  disabled,
  required,
  height = 46,
  heightDD = 40,
  onBlur = () => {},
  err,
  bgColor = "#fff",
  data = [],
}) => {
  const [showDD, setShowDD] = useState(false);
  const [banks, setBanks] = useState([...data]);

  const searchFn = (val) => {
    const b = data.map(
      (bank) => bank.name.toLowerCase().includes(val.toLowerCase()) && bank
    );
    console.log(b);
    const a = b.filter((itm) => itm !== false && itm);
    setBanks(a);
  };
  const nigBanksFn = () => {
    data?.length === 0 && setBanks(banksInNig.map((bank) => bank.bankName));
  };
  useEffect(() => {
    nigBanksFn();
  }, []);
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
          <Ionicons name="chevron-down" color={"#888"} size={20} />
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
          <InputField
            onChange={(e) => searchFn(e)}
            placheHolder="Search"
            label=""
          />
          <ScrollView
            contentContainerStyle={{
              padding: 10,
              backgroundColor: "#fff",
            }}
          >
            {banks.map((itm) => (
              <TouchableOpacity
                key={itm?.name}
                style={{
                  height: 60,
                  justifyContent: "center",
                  alignItems: "flex-start",
                  borderBottomWidth: 1,
                  borderBottomColor: "#C2C2C2",
                }}
                onPress={() => {
                  onChange(itm);
                  nigBanksFn();
                  setShowDD(false);
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "#2D2D2D",
                    fontWeight: "500",
                  }}
                >
                  {itm && capitalize(removeSeparators(itm?.name, "-"))}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default DropDownBank;
