import { Ionicons } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import ImagePickerCustom from "../../../components/ImagePickerCustom";
import { imageUploadApi } from "../../../services/coreService";
import { COLORS } from "../../../utils/colors";
import {
  ADD_CAR_DATA_CREATE,
  authSelector,
  newCarSelector,
} from "../../../store/appSlice";
import { delayFn } from "../../../utils";
import useAuth from "../../../hooks/useAuth";
import tw from "twrnc";
import ScreenWrapper from "../../ScreenWrapper";
import TextArea from "../../../components/TextArea";
import VeculAppLoader from "../../../components/VeculAppLoader";

const OwnersCondition = (props) => {
  const { navigation, route } = props;
  const { setterAuth, userData } = useAuth();
  const newCarData = useSelector(newCarSelector);
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  const [load, setLoad] = useState(false);
  const submitAddress = async () => {
    setLoad(true);
    const obj = {
      owners_condition: {
        condition_one: data?.owners_condition?.condition_one,
        condition_two: data?.owners_condition?.condition_two,
      },
    };
    try {
      dispatch(
        ADD_CAR_DATA_CREATE({
          ...userData?.newCarData,
          ...obj,
        })
      );
      // Save to local Store
      setterAuth({
        ...userData,
        newCarData: {
          ...userData?.newCarData,
          ...obj,
        },
      });
      delayFn(() => {
        navigation.navigate("PriceAvail");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  useEffect(() => {
    setLoad(true);
    delayFn(() => {
      setData({ ...newCarData });
      setLoad(false);
    }, 2000);
  }, []);
  return (
    <ScreenWrapper>
      <View
        style={{
          marginHorizontal: "3%",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          marginTop: 20,
          marginBottom: 30,
        }}
      >
        <BackButton type={2} onPress={() => navigation.goBack()} />

        <Text
          style={{
            color: "#101928",
            fontWeight: "600",
            fontSize: 20,
          }}
        >
          Owner's conditions (Optional)
        </Text>
      </View>

      {load ? (
        <VeculAppLoader />
      ) : (
        <View
          style={{
            marginTop: 23,
            flex: 1,
            marginHorizontal: "3%",
            gap: 20,
          }}
        >
          <View>
            <TextArea
              height={74}
              placeholder="Driver should be at least 25 years of age with at least 2 years of driving experience."
              brad={6}
              borderColor="#D0D5DD"
              borderWidth={1}
              label={"Condition 1"}
              value={data?.owners_condition?.condition_one}
              onchange={(e) =>
                setData({
                  ...data,
                  owners_condition: {
                    ...data?.owners_condition,
                    condition_one: e,
                  },
                })
              }
            />
          </View>
          <View>
            <TextArea
              height={74}
              placeholder="Driver should be at least 25 years of age with at least 2 years of driving experience."
              brad={6}
              borderColor="#D0D5DD"
              borderWidth={1}
              label={"Condition 2"}
              value={data?.owners_condition?.condition_two}
              onchange={(e) =>
                setData({
                  ...data,
                  owners_condition: {
                    ...data?.owners_condition,
                    condition_two: e,
                  },
                })
              }
            />
          </View>
        </View>
      )}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          left: 0,
          paddingHorizontal: "3%",
          marginTop: 10,
        }}
      >
        <CustomButton
          onPress={() => {
            submitAddress();
          }}
          label="Next"
          IconR={<Ionicons name="arrow-forward" size={20} color={"#fff"} />}
        />
      </View>
    </ScreenWrapper>
  );
};

export default OwnersCondition;
