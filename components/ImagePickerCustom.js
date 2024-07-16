import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { COLORS } from "../utils/colors";

const ImagePickerCustom = ({
  label,
  Icon,
  height = 109,
  width = "100%",
  fontSize = 18,
  fontWeight = "600",
  iconBg = "#C8DFFF",
  iconRad = 5,
  iconW = 47,
  iconH = 34,
  chosenImg,
  type = "Images" || "Videos",
  borderRadius = 5,
  borderStyle = "dashed",
  borderColor = "#1038C3",
  backgroundColor = "#E8F2FF",
  allowsMultipleSelection,
  err,
}) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions[type],
      allowsEditing: allowsMultipleSelection ? false : true,
      aspect: [1, 1],
      quality: Platform.OS === "android" ? 0.6 : 1,
      base64: true,
      allowsMultipleSelection,
    });
    if (!result.canceled) {
      const base64Img = `data:image/jpeg;base64,${result?.assets[0]?.base64}`;
      const base64Vid = `data:video/mp4;base64,${result?.assets[0]?.base64}`;
      chosenImg({
        url: "",
        vid: base64Vid,
        img: base64Img,
        file: result.assets[0],
        multi: result,
      });
    } else {
      return null;
    }
  };

  return (
    <View
      style={{
        height,
        width,
        backgroundColor,
        borderWidth: err ? 2 : 1,
        borderStyle,
        borderRadius,
        borderColor: err ? COLORS.red : borderColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        style={{
          // flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
        onPress={pickImage}
      >
        <View
          style={{
            width: iconW,
            height: iconH,
            backgroundColor: err ? COLORS.red : iconBg,
            borderRadius: iconRad,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Icon}
        </View>
        <Text
          allowFontScaling={false}
          style={{ color: "#fff", fontSize, fontWeight }}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

export default ImagePickerCustom;
