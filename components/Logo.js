import React from "react";
import { Image } from "react-native";

const Logo = ({ type = "primary", size = 32 }) => {
  return (
    <Image
      style={{ resizeMode: "contain" }}
      source={
        type === "primary"
          ? require(`../assets/images/logo2.png`)
          : require(`../assets/images/logo.png`)
      }
    />
  );
};

export default Logo;

/**
 *     Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,logo
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
 */
