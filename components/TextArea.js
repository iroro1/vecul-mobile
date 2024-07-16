import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import InfoCircle from "./InfoCircle";
import tw from "twrnc";
import { COLORS } from "../utils/colors";

const TextArea = ({
  onchange = () => {},
  height = 120,
  width = "100%",
  brad = 7,
  padding = 6,
  mx,
  bgColor = "#fff",
  textColor = "#333",
  fs = 16,
  textPadding = 10,
  placeholder = "Write your opinion...",
  value,
  onBlur = () => {},
  borderColor,
  style,
  placeholderTextColor = "#aaa",
  labelColor,
  borderWidth = 0,
  infoContent,
  infoWidth,
  infoHeight,
  turnOffInfo,
  infoSize,
  infoFs,
  required,
  label,
  maxEntry,
}) => {
  const [wordCount, setWordCout] = useState(0);
  return (
    <>
      {label && (
        <View style={tw`flex-row gap-1 mb-1`}>
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
          </Text>
          {required && (
            <Text
              style={{
                color: "#fa8254ff",
              }}
              allowFontScaling={false}
            >
              *
            </Text>
          )}
          {infoContent && (
            <InfoCircle
              width={infoWidth}
              height={infoHeight}
              content={infoContent}
              turnOff={turnOffInfo}
              size={infoSize}
              fs={infoFs}
            />
          )}
        </View>
      )}
      <View
        style={{
          marginHorizontal: mx,
          height,
          width,
          backgroundColor: bgColor,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding,
          position: "relative",
          borderRadius: brad,
          borderColor: wordCount >= maxEntry ? COLORS.red : borderColor,
          borderWidth,
          ...style,
        }}
      >
        <TextInput
          style={{
            color: textColor,
            padding: textPadding,
            fontSize: fs,
          }}
          onBlur={onBlur}
          value={value}
          onChangeText={(e) => {
            setWordCout(e.length);
            onchange(e);
          }}
          allowFontScaling={false}
          multiline
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
        />
        <Text
          style={{
            position: "absolute",
            bottom: 5,
            right: 10,
            fontSize: 12,
            color: wordCount >= maxEntry ? COLORS.red : COLORS.green,
          }}
          allowFontScaling={false}
        >
          {wordCount}/{maxEntry}
        </Text>
      </View>
    </>
  );
};

export default TextArea;
