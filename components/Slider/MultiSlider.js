import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RangeSlider, { Slider } from "react-native-range-slider-expo";

const VMultiSlider = ({
  max = 500000,
  min = 0,
  step = 4,
  initialValue = 12,
  valueLabelsBackgroundColor = "#1671D9",
  inRangeBarColor = "#1671D9",
  outOfRangeBarColor = "#D0D5DD",
  showRangeLabels = false,
  showValueLabels = true,
  styleSize = 20,
  knobBubbleTextStyle = {
    height: 40,
    width: 60,
    paddingHorizontal: 5,
    borderRadius: 0,
    backgroundColor: "#1671D9",
    borderRadius: 8,
  },
  rangeLabelsTextColor = "#1671D9",
  label = "AB",
  containerStyle = {
    padding: 14,
    paddingTop: 10,
  },
  displayValue = "",
  onChange = () => {},
}) => {
  const [lowValue, setLowValue] = useState(min);
  const [highValue, setHighValue] = useState(max);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{ fontWeight: "700", marginLeft: 2 }}
          allowFontScaling={false}
        >
          {label}
        </Text>
        <Text
          style={{ fontWeight: "700", marginLeft: 2 }}
          allowFontScaling={false}
        >
          {displayValue}
        </Text>
      </View>
      <RangeSlider
        min={min}
        max={max}
        containerStyle={{
          ...containerStyle,
        }}
        fromValueOnChange={(value) => {
          setLowValue(value);
          onChange(`${lowValue} -  ${highValue}`);
        }}
        toValueOnChange={(value) => {
          setHighValue(value);
          onChange(`${lowValue} -  ${highValue}`);
        }}
        initialLowValue={lowValue}
        initialHighValue={highValue}
        rangeLabelsTextStyle={{ color: "#1fb28a" }}
        thumbStyle={{ backgroundColor: "#1fb28a" }}
        lineStyle={{ backgroundColor: "#d3d3d3" }}
        toKnobColor="#1671D9"
        fromKnobColor="#1671D9"
        step={step}
        initialValue={initialValue}
        valueLabelsBackgroundColor={valueLabelsBackgroundColor}
        inRangeBarColor={inRangeBarColor}
        outOfRangeBarColor={outOfRangeBarColor}
        showRangeLabels={showRangeLabels}
        showValueLabels={showValueLabels}
        styleSize={styleSize}
        knobBubbleTextStyle={{
          ...knobBubbleTextStyle,
        }}
        rangeLabelsTextColor={rangeLabelsTextColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default VMultiSlider;
