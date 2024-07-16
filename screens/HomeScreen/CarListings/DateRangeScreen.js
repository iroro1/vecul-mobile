import { AnimatePresence, MotiView, Text, View } from "moti";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { Calendar } from "react-native-calendars";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import { SET_DATE_FILTER } from "../../../store/appSlice";
import ScreenWrapper from "../../ScreenWrapper";

const DateRangeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [path, setPath] = useState("start");
  const [data, setData] = useState({
    starDate: "",
    endDate: "",
  });

  const chooseDate = () => {
    dispatch(SET_DATE_FILTER(data));

    navigation.goBack();
  };
  return (
    <ScreenWrapper dismissKeyboard={false}>
      <View
        style={{
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginHorizontal: "3%",
        }}
      >
        <BackButton type={2} onPress={() => navigation.goBack()} />
        <Text
          style={{
            color: "#101928",
            fontWeight: "600",
            fontSize: 14,
            // fontFamily: "Poppins_400Regular",
          }}
        >
          Select trip date
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: "3%",
          flex: 1,
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <Pressable
            onPress={() => {
              setSelected("");
              setPath("start");
            }}
            style={{
              width: 154,
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              borderBottomWidth: 1,
              borderBottomColor: path === "start" ? "#1671D9" : "#E4E7EC",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: path === "start" ? "#1671D9" : "#344054",
                // fontFamily: "Poppins_400Regular",
              }}
            >
              Start date
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setSelected("");
              setPath("end");
            }}
            style={{
              width: 154,
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              borderBottomWidth: 1,
              borderBottomColor: path !== "start" ? "#1671D9" : "#E4E7EC",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: path !== "start" ? "#1671D9" : "#344054",
                // fontFamily: "Poppins_400Regular",
              }}
            >
              End date
            </Text>
          </Pressable>
        </View>
        <KeyboardAwareScrollView
          style={{
            flex: 1,
          }}
        >
          <Calendar
            onDayPress={(day) => {
              setSelected(day.dateString);
              if (path === "start") {
                setData({ ...data, starDate: day.dateString });
              } else {
                setData({ ...data, endDate: day.dateString });
              }
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "navy",
              },
            }}
          />

          {/* {path === "start" && (
                <View
                  style={{
                    marginTop: 43,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "48%", position: "relative" }}>
                    <InputField
                      onBlur={() => null}
                      placheHolder="15"
                      label={"Start time"}
                      onChange={(e) => {
                        setData({ ...data, starttimeHr: e });
                      }}
                      value={data?.starttimeHr}
                    />
                    <Text
                      style={{
                        color: "#101928",
                        fontSize: 14,
                        fontWeight: "400",
                        position: "absolute",
                        right: 20,
                        top: 40,
                      }}
                    >
                      hr
                    </Text>
                  </View>
                  <View style={{ width: "48%", position: "relative" }}>
                    <InputField
                      onChange={(e) => {
                        setData({ ...data, starttimeMin: e });
                      }}
                      value={data?.starttimeMin}
                      placheHolder="30"
                      label={" "}
                    />
                    <Text
                      style={{
                        color: "#101928",
                        fontSize: 14,
                        fontWeight: "400",
                        position: "absolute",
                        right: 20,
                        top: 40,
                      }}
                    >
                      min
                    </Text>
                  </View>
                </View>
              )}
              {path === "end" && (
                <View
                  style={{
                    marginTop: 43,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "48%", position: "relative" }}>
                    <InputField
                      onBlur={() => null}
                      placheHolder="15"
                      label={"End time"}
                      onChange={(e) => {
                        setData({ ...data, endTimeHr: e });
                      }}
                      value={data?.endTimeHr}
                    />
                    <Text
                      style={{
                        color: "#101928",
                        fontSize: 14,
                        fontWeight: "400",
                        position: "absolute",
                        right: 20,
                        top: 40,
                      }}
                    >
                      hr
                    </Text>
                  </View>
                  <View style={{ width: "48%", position: "relative" }}>
                    <InputField
                      onChange={(e) => {
                        setData({ ...data, endTimeMin: e });
                      }}
                      value={data?.endTimeMin}
                      placheHolder="30"
                      label={" "}
                    />
                    <Text
                      style={{
                        color: "#101928",
                        fontSize: 14,
                        fontWeight: "400",
                        position: "absolute",
                        right: 20,
                        top: 40,
                      }}
                    >
                      min
                    </Text>
                  </View>
                </View>
              )} */}
        </KeyboardAwareScrollView>
        <View
          style={{
            bottom: 10,
            left: 0,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomButton
            onPress={() => {
              chooseDate();
            }}
            style={{
              minWidth: "100%",
            }}
            fw="600"
            label="Select date"
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default DateRangeScreen;
