import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import tw from "twrnc";
import { COLORS } from "../utils/colors";
const PasswordInputField = ({
  label = "Password",
  placheHolder,
  value,
  onChange,
  fs = 14,
  labelColor = "#333",
  borderColor = "#C2C2C2",
  inputTextColor,
  focusColor = COLORS.primary,
  showEye = true,
  required,
  height = 46,
  placeHolderColor = "#bbb",
  maxEntry,
}) => {
  const [show, setShow] = useState(false);
  const [fcs, setFcs] = useState(false);
  return (
    <View
      style={{
        width: "100%",
        paddingRight: 5,
      }}
    >
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
      <View
        style={{
          position: "relative",
        }}
      >
        <TextInput
          style={{
            marginTop: 8,
            borderColor: fcs ? focusColor : borderColor,
            borderWidth: 1,
            paddingBottom: 12,
            fontSize: 16,
            color: inputTextColor || labelColor,
            height,
            padding: 9,
            borderRadius: 5,
          }}
          maxLength={maxEntry}
          allowFontScaling={false}
          onChangeText={onChange}
          onFocus={() => setFcs(true)}
          onBlur={() => setFcs(false)}
          value={value}
          placeholder={placheHolder}
          placeholderTextColor={placeHolderColor}
          secureTextEntry={!show}
        />
        <Pressable
          style={[
            tw`absolute right-[4px] top-[10px]  h-[41px]  w-[50px] flex items-center justify-center`,
            { zIndex: 100 },
          ]}
          onPress={() => setShow(!show)}
        >
          {showEye &&
            (!show ? (
              <Text style={tw`text-[12px] font-500 text-[#1671D9] underline`}>
                Show
              </Text>
            ) : (
              <Text style={tw`text-[12px] font-500 text-[#1671D9] underline`}>
                Hide
              </Text>
            ))}
        </Pressable>
      </View>
    </View>
  );
};

export default PasswordInputField;
