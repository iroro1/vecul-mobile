import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { addEllipses } from "../utils";
import TextCustom from "./TextCustom";

const Search = ({ onPress, value }) => {
  return (
    <TouchableOpacity
      style={{
        marginVertical: 9,
        flexDirection: "row",
        height: 46,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        alignItems: "center",
        position: "relative",
        borderColor: "#D0D5DD",
        borderWidth: 1,
      }}
      onPress={onPress}
    >
      <Ionicons
        style={{
          position: "absolute",
          left: 10,
        }}
        name="search"
        size={20}
        color={"#667185"}
      />
      <TextCustom
        twClasses={`text-[${value ? "#333" : "#98A2B3"}] text-[${
          value ? 14 : 12
        }px] pl-[40px] rounded-[5px] w-[100%]`}
      >
        {(value && addEllipses(value, 19, 3)) || " Search Location"}
      </TextCustom>
    </TouchableOpacity>
  );
};

export default Search;
