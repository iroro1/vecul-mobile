import { View, Text } from "react-native";
import React from "react";
import TimePickertransparent from "../TimePickertransparent";

const TimepickerOld = () => {
  return (
    <View
      style={{
        height: 46,
        position: "relative",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#C2C2C2",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 40,
      }}
    >
      <Text
        style={{
          position: "absolute",
          top: -22,
          color: "#101928",
        }}
      >
        End
      </Text>
      <Ionicons
        name="calendar-outline"
        size={16}
        style={{ position: "absolute", left: 8 }}
      />
      <Text style={{ color: "#101928", marginLeft: 34 }}>
        {tripTime?.endDate || "12 February, 2024"}
      </Text>
      {/* <Text style={{ color: "#101928", marginRight: 8 }}>
      at {tripTime?.endTime || "10:30 PM"}
    </Text> */}
      <View
        style={{
          opacity: 0,
          position: "absolute",
          backgroundColor: "red",
          width: "100%",
          zIndex: 100,
        }}
      >
        <TimePickertransparent
          dateFn={(e) => {
            const arr = e.split(" ");
            const date = arr[0].split(",")[0];
            const amPm = e
              .split(" ")[1]
              .slice(e.split(" ")[1].length - 2, e.split(" ")[1].length);
            const time =
              arr[1].split(":")[0] + ":" + arr[1].split(":")[1] + " " + amPm;

            setTripTiime({
              ...tripTime,
              endDate: date,
              endTime: time,
            });
          }}
          showLabel
          placeholder={""}
          mode="datetime"
        />
      </View>
    </View>
  );
};

export default TimepickerOld;
