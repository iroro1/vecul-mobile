import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { COLORS } from "../utils/colors";
import InfoCircle from "./InfoCircle";
import tw from "twrnc";

const InputField = ({
  label = "First Name",
  placheHolder = "",
  value,
  onChange,
  fs = 14,
  labelColor = "#333",
  borderColor = "#D0D5DD",
  inputTextColor,
  keyType,
  focusColor = COLORS.primary,
  maxEntry,
  disabled,
  onBlur = () => {},
  required,
  height = 46,
  pl = 9,
  err,
  submitFn = () => {},
  bgColor = "#fff",
  LIcon,
  infoContent,
  infoWidth,
  infoHeight,
  turnOffInfo,
  infoSize,
  infoFs,
}) => {
  const [fcs, setFcs] = useState(false);

  return (
    <View
      style={{
        width: "100%",
        paddingRight: 5,
      }}
    >
      {label && (
        <View style={tw`flex-row gap-1`}>
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
          position: "relative",
        }}
      >
        {LIcon && (
          <View
            style={{
              position: "absolute",
              zIndex: 99,
              top: height / 2,
              left: pl - 25,
            }}
          >
            {LIcon}
          </View>
        )}
        <TextInput
          style={[
            {
              borderColor: fcs ? focusColor : err ? COLORS.red : borderColor,
              borderWidth: 1,
              paddingBottom: 6,
              fontSize: fs,
              color: inputTextColor || labelColor,
              borderRadius: 5,
              height,
              padding: 9,
              marginTop: 8,
              paddingLeft: pl,
              backgroundColor: bgColor,
            },
          ]}
          allowFontScaling={false}
          maxLength={maxEntry}
          onFocus={() => setFcs(true)}
          onBlur={() => {
            setFcs(false);
            onBlur();
          }}
          onChangeText={onChange}
          value={value}
          placeholder={placheHolder}
          keyboardType={keyType}
          placeholderTextColor="#C2C2C2"
          editable={!disabled}
          selectTextOnFocus={!disabled}
          onSubmitEditing={submitFn}
        />
      </View>
    </View>
  );
};

export default InputField;
