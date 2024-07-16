import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Slider } from "react-native-range-slider-expo";

const VSlider = ({
  max = 40,
  min = 0,
  step = 4,
  initialValue = 12,
  knobColor = "red",
  valueLabelsBackgroundColor = "black",
  inRangeBarColor = "purple",
  outOfRangeBarColor = "orange",
  showRangeLabels = true,
  showValueLabels = true,
  styleSize = 20,
  knobBubbleTextStyle = {
    height: 40,
    width: 60,
    paddingHorizontal: 5,
    borderRadius: 0,
    backgroundColor: "purple",
  },
  rangeLabelsTextColor = "red",
  onChange = () => {},
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <View style={styles.container}>
      <Slider
        min={min}
        max={max}
        step={step}
        valueOnChange={(value) => {
          setValue(value);
          onChange(value);
        }}
        initialValue={value}
        knobColor={knobColor}
        valueLabelsBackgroundColor={valueLabelsBackgroundColor}
        inRangeBarColor={inRangeBarColor}
        outOfRangeBarColor={outOfRangeBarColor}
        showRangeLabels={showRangeLabels}
        showValueLabels={showValueLabels}
        styleSize={styleSize}
        knobBubbleTextStyle={{
          ...knobBubbleTextStyle,
        }}
        valueLabelsTextColor="red"
        rangeLabelsTextColor={rangeLabelsTextColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default VSlider;
