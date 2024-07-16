import { View, Text } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";

const CalendarPicker = ({
  onSelect,
  markedDates = {},
  markingType = "period",
  disabledDaysIndexes,
  displayLoadingIndicator = false,
  styles,
  theme,
  stylesCont,
}) => {
  /***
   * PROP: markingType
   * period
   * dot
   * multi-dot
   * multi-period
   *
   * 
   *  {
            "2024-06-15": { marked: true, dotColor: "#50cebb" },
            "2024-06-16": { marked: true, dotColor: "#50cebb" },
            "2024-06-21": {
              startingDay: true,
              color: "#50cebb",
              textColor: "white",
            },
            "2024-06-22": { color: "#70d7c7", textColor: "white" },
            "2024-06-23": {
              color: "#70d7c7",
              textColor: "white",
              marked: true,
              dotColor: "white",
              disableTouchEvent: true,
            },
            "2024-06-24": { color: "#70d7c7", textColor: "white" },
            "2024-06-25": {
              endingDay: true,
              color: "#50cebb",
              textColor: "white",
            },
          }
   */
  const [selected, setSelected] = useState("");
  console.log(disabledDaysIndexes, 12);
  return (
    <View style={stylesCont}>
      <Calendar
        style={styles}
        theme={theme}
        onDayPress={(day) => {
          setSelected(day.dateString);
          onSelect(day.dateString);
        }}
        markingType={markingType}
        markedDates={markedDates}
        disabledDaysIndexes={disabledDaysIndexes}
        displayLoadingIndicator={displayLoadingIndicator}
        enableSwipeMonths
      />
    </View>
  );
};

export default CalendarPicker;
