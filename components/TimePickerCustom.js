import React, { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useSelector } from "react-redux";
import { COLORS } from "../utils/colors";
const TimePickerCustom = ({
  dateFn = () => {},
  mode = "datetime",
  placeholder,
  showLabel = "",
  color = "#333",
  fontSize,
  reset,
  value,
  err,
  required,
  onBlur = () => {},
  bgColor = "#fff",
}) => {
  const [selectedDate, setSelectedDate] = useState();
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  useEffect(() => {
    setSelectedDate();
  }, [reset]);
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
    onBlur();
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
    if (mode === "datetime") dateFn(date.toLocaleString());
    else if (mode === "time") dateFn(date.toLocaleTimeString());
    else if (mode !== "time") dateFn(date.toLocaleDateString());
  };
  const reloadSession = useSelector((d) => d.app);

  useEffect(() => {
    setSelectedDate();
  }, [reloadSession?.setReloadCreateSession === true]);
  const showLabelFn = () => {
    if (mode === "time") {
      if (value) {
        const a = value;
        const ampm = a.slice(a.length - 2, a.length);
        const b = a.slice(0, a.length - 6) + " " + ampm;
        return b;
      } else if (selectedDate !== undefined) {
        const a = selectedDate?.toLocaleTimeString();
        const ampm = a.slice(a.length - 2, a.length);
        const b = a.slice(0, a.length - 6) + " " + ampm;
        return b;
      } else return placeholder;
    } else if (mode === "date") {
      if (value) {
        return value;
      } else if (selectedDate !== undefined) {
        return selectedDate?.toLocaleDateString();
      } else return placeholder;
    } else if (mode === "datetime") {
      if (value) {
        return value;
      } else if (selectedDate !== undefined) {
        return selectedDate?.toLocaleString();
      } else return placeholder;
    } else return placeholder;
  };

  console.log(showLabelFn(), "sss", mode, value);
  return (
    <>
      <Pressable
        style={{
          height: 46,
          position: "relative",
          borderWidth: 1,
          borderRadius: 5,
          borderColor: err ? COLORS.red : "#C2C2C2",
          backgroundColor: bgColor,
        }}
        onPress={showDatePicker}
      >
        <Text
          style={{
            marginTop: -25,
            marginBottom: 5,
            fontSize,
          }}
          allowFontScaling={false}
        >
          {showLabel}{" "}
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
        </Text>
        <Text
          style={{
            fontSize: fontSize,
            fontWeight: "400",
            color: selectedDate || value ? color : "#C2C2C2",
            textAlign: "left",
            marginBottom: 8,
            marginTop: 15,
            marginLeft: 15,
          }}
          allowFontScaling={false}
        >
          {showLabelFn()}
        </Text>
      </Pressable>
      <DateTimePickerModal
        is24Hour={false}
        date={selectedDate}
        isVisible={datePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        style={{
          backgroundColor: "red",
        }}
      />
    </>
  );
};

export default TimePickerCustom;
