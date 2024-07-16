import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import tw from "twrnc";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import InputField from "../../../components/InputField";
import TextArea from "../../../components/TextArea";
import TimePickertransparent from "../../../components/TimePickertransparent";
import VeculAppLoader from "../../../components/VeculAppLoader";
import useCamera from "../../../hooks/useCamera";
import { getStoreApi, imageUploadApi } from "../../../services/coreService";
import { authSelector } from "../../../store/appSlice";
import { COLORS } from "../../../utils/colors";
import ScreenWrapper from "../../ScreenWrapper";
import useToast from "../../../hooks/useToast";
import { capitalize } from "../../../utils";

const StoreDetails = (props) => {
  const { navigation } = props;
  const userStore = useSelector(authSelector);
  const [img, setImg] = useState("");
  const [load, setLoad] = useState(false);
  const [loadImg, setLoadImg] = useState(false);
  const [data, setData] = useState({
    rentalName: "Boss Cars",
    description: "Our cars are the best at mixing luxry and prices",
  });
  const { pickImage, result } = useCamera();
  const { toast } = useToast();
  const uploadImg = async () => {
    setLoadImg(true);
    console.log(123);
    try {
      const res = await imageUploadApi(
        {
          user_id: userStore?.sub,
          contents: ["data:image/png;base64," + result?.file?.base64],
        },
        userStore?.id_token
      );
      if (res?.data?.success) {
        // userStore?.hostAccountType === "As individual"
        // ?
        setData({ ...data, logo: res?.data?.data[0] });
        // : setDataCoporate({ ...dataCoporate, logo: res?.data?.data[0] });
      }
    } catch (error) {
      console.log(error);
    }
    setLoadImg(false);
  };
  const loadBusinessDetails = async () => {
    setLoad(true);
    try {
      const res = await getStoreApi(userStore?.id_token);
      console.log(res, "rs");
      if (res?.status === 200) {
        setData(res?.data?.data);
      } else {
        toast(
          "error",
          capitalize(res?.response?.data?.message),

          3000
        );

        navigation.navigate("HostingAs");
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: "HostingAs" }],
        // });
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  console.log(result, "res");
  useEffect(() => {
    uploadImg();
  }, [result]);
  useEffect(() => {
    loadBusinessDetails();
  }, []);
  const saveFn = async () => {
    try {
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScreenWrapper dismissKeyboard={false}>
      {load ? (
        <VeculAppLoader size={80} />
      ) : (
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
              Business details
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: "3%",
            }}
          >
            <ScrollView
              style={{
                flex: 1,
                paddingHorizontal: "3%",
                marginBottom: 60,
              }}
              showsVerticalScrollIndicator={false}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 16,
                    marginBottom: 15,
                  }}
                >
                  Upload logo
                  <Text style={tw`text-[${COLORS.red}] text-[14px]`}> *</Text>
                </Text>

                <Pressable
                  style={{
                    height: 100,
                    width: 100,
                    backgroundColor: "#B6D8FF",
                    borderRadius: 100 / 2,
                    justifyContent: !img && "center",
                    alignItems: !img && "center",
                    position: "relative",
                  }}
                  onPress={async () => {
                    await pickImage();
                  }}
                >
                  {loadImg ? (
                    <View
                      style={{
                        height: 100,
                        width: 100,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ActivityIndicator
                        style={{ marginLeft: 0 }}
                        color={COLORS.red}
                        size="small"
                      />
                    </View>
                  ) : (
                    <>
                      {data?.logo ? (
                        <Image
                          source={{ uri: data.logo }}
                          style={{
                            height: 100,
                            width: 100,
                            borderRadius: 100 / 2,
                            borderWidth: 1,
                            borderColor: "#eee",
                            resizeMode: "cover",
                          }}
                        />
                      ) : (
                        <Ionicons name="camera" size={40} />
                      )}
                    </>
                  )}

                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 12,
                      backgroundColor: "#1038C3",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      zIndex: 99,
                      borderColor: "#fff",
                      borderWidth: 1,
                      right: 7,
                      bottom: 7,
                    }}
                  >
                    <Ionicons size={10} name="pencil" color={"#fff"} />
                  </View>
                </Pressable>
              </View>
              <View style={{ flex: 1, marginTop: 20 }}>
                <InputField
                  required
                  placheHolder=""
                  label="Bussiness name"
                  value={data?.business_name}
                  onChange={(e) => setData({ ...data, business_name: e })}
                />
                <View style={{ marginTop: 20 }}>
                  <InputField
                    required
                    placheHolder="eg. 08011111111"
                    label="Phone number"
                    value={data?.phone_number}
                    onChange={(e) => setData({ ...data, phone_number: e })}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginTop: 40,
                    position: "relative",
                    borderWidth: 1,
                    maxHeight: 138,
                    borderRadius: 8,
                    borderColor: "#D0D5DD",
                  }}
                >
                  <Text
                    style={{ position: "absolute", top: -20, fontSize: 14 }}
                  >
                    Say something about your rental business
                  </Text>
                  <TextArea
                    placeholder="Something that sets you apart from other rental businesses"
                    height={128}
                    value={data?.description}
                    onchange={(e) => setData({ ...data, description: e })}
                  />
                </View>

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
                      width: "100%",
                    }}
                  >
                    Date of birth{" "}
                    <Text style={tw`text-[${COLORS.red}]`}>*</Text>
                  </Text>
                  <Text
                    style={{
                      color: data?.dob === "" ? "#98A2B3" : "#101928",
                      marginLeft: 8,
                      width: "100%",
                    }}
                  >
                    {data?.dob || "Select date"}
                  </Text>
                  <Ionicons
                    name="calendar-outline"
                    size={16}
                    style={{ position: "absolute", right: 8 }}
                  />

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
                      disabled
                      dateFn={(e) => {
                        const dobIos =
                          e.split("/")[1] +
                          " " +
                          showMonth(e.split("/")[0]) +
                          ", " +
                          e.split("/")[2];
                        const dobAnd =
                          e.split("/")[0] +
                          " " +
                          showMonth(e.split("/")[1]) +
                          ", " +
                          e.split("/")[2];
                        Platform.OS === "android"
                          ? setData({ ...data, dob: dobAnd, dobReal: e })
                          : setData({ ...data, dob: dobIos, dobReal: e });
                      }}
                      showLabel
                      placeholder={""}
                      mode="date"
                      value={data?.dob}
                      // bgColor="#aaa"
                    />
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <InputField
                    required
                    placheHolder="1234"
                    label="Transaction pin"
                    onChange={(e) => setData({ ...data, pin: e })}
                    maxEntry={4}
                    value={data?.pin}
                  />
                  <Text style={tw`text-[#667085] text-[12px] my-2`}>
                    Pin must be 4 digits and will be used for withdrawal
                  </Text>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                left: "3%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomButton onPress={() => saveFn()} label="Save changes" />
            </View>
          </View>
        </>
      )}
    </ScreenWrapper>
  );
};

export default StoreDetails;
