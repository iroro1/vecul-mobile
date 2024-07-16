import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import ToastBoxVecul from "../../../components/ToastBoxVecul";
import useAuth from "../../../hooks/useAuth";
import { SET_AUTH_STATE, authSelector } from "../../../store/appSlice";
import { COLORS } from "../../../utils/colors";
import ScreenWrapper from "../../ScreenWrapper";

const HostingAs = (props) => {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const userStore = useSelector(authSelector);
  const { setterAuth, userData } = useAuth();
  const [hostOptions, setHostOptions] = useState([
    {
      title: "As individual",
      subTitle: "Earn extra income by renting out your personal vehicle.",
      selected: false,
    },
    {
      title: "A corporate body",
      subTitle: "Expand your reach by listing your fleet on Vecul.",
      selected: false,
    },
  ]);
  const disableFn = () => {
    if (hostOptions[0].selected || hostOptions[1].selected) return false;

    return true;
  };
  return (
    <ScreenWrapper dismissKeyboard={false}>
      <>
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
            Host as
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: "3%",
          }}
        >
          <View>
            {hostOptions.map((op) => (
              <TouchableOpacity
                key={op.title}
                onPress={() => {
                  const arr = hostOptions.map((itm) => {
                    if (itm.title === op.title)
                      return { ...itm, selected: true };
                    else return { ...itm, selected: false };
                  });
                  console.log(arr, "arr");

                  dispatch(
                    SET_AUTH_STATE({
                      ...userStore,
                      hostAccountType: op.title,
                    })
                  );
                  setterAuth({ ...userData, hostAccountType: op.title });

                  setHostOptions(arr);
                }}
                style={tw`h-[78px] flex-row  gap-4 rounded-[8px] border border-[#E4E7EC] p-4 mb-5`}
              >
                <View style={tw``}>
                  <View
                    style={tw`w-[20px] h-[20px] flex-row justify-center items-center border rounded-full border-[${
                      op?.selected ? COLORS.primary : "#D0D5DD"
                    }]`}
                  >
                    <View
                      style={tw`h-[10px]  w-[10px] rounded-full bg-[${
                        op?.selected ? COLORS.primary : ""
                      }]`}
                    ></View>
                  </View>
                </View>
                <View>
                  <Text style={tw`text-[#101928] text-[16px] font-600`}>
                    {op?.title}
                  </Text>
                  <Text style={tw`text-[#667185] text-[12px] font-400 mt-2`}>
                    {op?.subTitle}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={tw`mt-auto`}>
            <CustomButton
              disabled={disableFn()}
              label="Continue"
              onPress={() => navigation.navigate("HostYouCars")}
            />
          </View>
        </View>
      </>
    </ScreenWrapper>
  );
};

export default HostingAs;
