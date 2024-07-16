import { Ionicons } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import InputField from "../../../components/InputField";
import TextArea from "../../../components/TextArea";
import useCamera from "../../../hooks/useCamera";
import { createStoreApi, imageUploadApi } from "../../../services/coreService";
import { authSelector } from "../../../store/appSlice";
import ToastBoxVecul from "../../../components/ToastBoxVecul";
import useToast from "../../../hooks/useToast";
import tw from "twrnc";
import { COLORS } from "../../../utils/colors";
import TimePickertransparent from "../../../components/TimePickertransparent";
import InfoCircle from "../../../components/InfoCircle";
import ScreenWrapper from "../../ScreenWrapper";
const HostYouCars = (props) => {
  const { navigation, route } = props;
  const dispatch = useDispatch();
  const userStore = useSelector(authSelector);
  const [load, setLoad] = useState(false);

  const [loadImg, setLoadImg] = useState(false);
  const mArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const showMonth = (digit) => {
    return mArr[digit - 1];
  };
  const [data, setData] = useState({
    business_name: "",
    phone_number: "",
    description: "",
    bvn: "",
    dob: "",
    pin: "",
    logo: "",
    host_type: "individual",
  });
  const [dataCoporate, setDataCoporate] = useState({
    business_name: "",
    business_address: "",
    email: "",
    phone_number: "",
    description: "",
    bvn: "",
    dob: "",
    pin: "",
    logo: "",
    host_type: "corporate",
  });
  const carsListed = useSelector((state) => state?.app?.carListing);
  const { toast } = useToast();
  useEffect(() => {
    setHostAccountCreated(route?.params?.hostAccountCreated);
  }, []);

  const [hostAccountCreated, setHostAccountCreated] = useState(
    userStore?.hasHostAccount || false
  );
  const [img, setImg] = useState("");
  const { pickImage, result } = useCamera();
  const uploadImg = async () => {
    setLoadImg(true);
    try {
      const res = await imageUploadApi(
        {
          user_id: userStore?.sub,
          contents: ["data:image/png;base64," + result?.file?.base64],
        },
        userStore?.id_token
      );
      if (res?.data?.success) {
        userStore?.hostAccountType === "As individual"
          ? setData({ ...data, logo: res?.data?.data[0] })
          : setDataCoporate({ ...dataCoporate, logo: res?.data?.data[0] });
      }
    } catch (error) {
      console.log(error);
    }
    setLoadImg(false);
  };
  const fmtDate = (dt) => {
    return dt.split("/")[2] + "/" + dt.split("/")[0] + "/" + dt.split("/")[1];
  };
  const createStore = async () => {
    setLoad(true);
    const obj =
      userStore?.hostAccountType === "As individual"
        ? {
            business_name: data.business_name.trim(),
            phone_number: data.phone_number,
            description: data.description,
            bvn: data.bvn,
            dob: fmtDate(data?.dobReal),
            pin: data.pin,
            logo: data.logo,
            host_type: "individual",
          }
        : {
            business_name: dataCoporate.business_name.toString().trim(),
            business_address: dataCoporate.business_address.toString().trim(),
            email: dataCoporate.email.toString().trim(),
            phone_number: dataCoporate.phone_number.toString().trim(),
            description: dataCoporate.description,
            bvn: dataCoporate.bvn,
            dob: fmtDate(dataCoporate?.dobReal),
            pin: dataCoporate.pin,
            logo: dataCoporate.logo,
            host_type: "corporate",
          };

    try {
      const res = await createStoreApi(obj, userStore?.id_token);
      if (
        res?.status === 200 ||
        res?.response?.data?.message === "User already exists, data stored"
      ) {
        navigation.navigate("StoreCreateSuccess");
      } else {
        toast("error", "Something went wrong", "Try again Later");
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  useEffect(() => {
    uploadImg();
  }, [result]);
  const disableFn = () => {
    if (userStore?.hostAccountType === "As individual") {
      if (
        data?.business_name === "" ||
        data?.bvn === "" ||
        data?.dob === "" ||
        data?.logo === "" ||
        data?.phone_number === "" ||
        data?.pin === ""
      )
        return true;

      return false;
    } else {
      if (
        dataCoporate?.business_name === "" ||
        dataCoporate?.email === "" ||
        dataCoporate?.bvn === "" ||
        dataCoporate?.dob === "" ||
        dataCoporate?.logo === "" ||
        dataCoporate?.phone_number === "" ||
        dataCoporate?.pin === ""
      )
        return true;

      return false;
    }
  };
  return (
    <ScreenWrapper dismissKeyboard={false}>
      <>
        {!hostAccountCreated &&
          (userStore?.hostAccountType === "As individual" ? (
            <>
              <View
                style={{
                  marginHorizontal: "3%",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 20,
                  marginTop: 20,
                  marginBottom: 10,
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
              <ScrollView
                style={{
                  flex: 1,
                  paddingHorizontal: "3%",
                  marginBottom: 60,
                }}
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
                    onPress={() => pickImage()}
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
                    onChange={(e) => setData({ ...data, business_name: e })}
                  />
                  <View style={{ marginTop: 20 }}>
                    <InputField
                      required
                      placheHolder="eg. 08011111111"
                      label="Phone number"
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
                      onchange={(e) => setData({ ...data, description: e })}
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <InputField
                      required
                      placheHolder="1234567890"
                      label="BVN"
                      onChange={(e) => setData({ ...data, bvn: e })}
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
                    />
                    <Text style={tw`text-[#667085] text-[12px] my-2`}>
                      Pin must be 4 digits and will be used for withdrawal
                    </Text>
                  </View>
                </View>
              </ScrollView>
              {/*  */}
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "93%",
                  left: "3%",
                  justifyContent: "center",
                  alignItems: "center",
                  // paddingHorizontal: "3%",
                }}
              >
                <CustomButton
                  disabled={disableFn()}
                  onPress={() => {
                    createStore();
                  }}
                  loading={load}
                  label="Continue to vehicle listing"
                  IconR={
                    <Ionicons name="arrow-forward" size={20} color={"#fff"} />
                  }
                />
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  marginHorizontal: "3%",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 20,
                  marginTop: 20,
                  marginBottom: 10,
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
                  Bussiness details
                </Text>
              </View>
              <ScrollView
                style={{
                  flex: 1,
                  paddingHorizontal: "3%",
                  marginBottom: 60,
                }}
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
                    onPress={() => pickImage()}
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
                        {dataCoporate?.logo ? (
                          <Image
                            source={{ uri: dataCoporate.logo }}
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
                    label="Business name"
                    onChange={(e) =>
                      setDataCoporate({ ...dataCoporate, business_name: e })
                    }
                  />
                  <View style={{ marginTop: 20 }}>
                    <InputField
                      placheHolder=""
                      label="Business address"
                      onChange={(e) =>
                        setDataCoporate({
                          ...dataCoporate,
                          business_address: e,
                        })
                      }
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <InputField
                      required
                      placheHolder=""
                      label="Contact email"
                      onChange={(e) =>
                        setDataCoporate({ ...dataCoporate, email: e })
                      }
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <InputField
                      required
                      placheHolder="eg. 08011111111"
                      label="Contact phone number"
                      onChange={(e) =>
                        setDataCoporate({ ...dataCoporate, phone_number: e })
                      }
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
                      onchange={(e) =>
                        setDataCoporate({ ...dataCoporate, description: e })
                      }
                    />
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <InputField
                      placheHolder="1234567890"
                      label="Owners BVN"
                      required
                      onChange={(e) =>
                        setDataCoporate({ ...dataCoporate, bvn: e })
                      }
                      infoContent={
                        "Required for creating a secure virtual payment account."
                      }
                      infoWidth={"170px"}
                      infoHeight={"65px"}
                      infoSize={16}
                      infoFs={"14px"}
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
                    <View
                      style={tw`items-center flex-row flex-start absolute top-[-26px] z-99`}
                    >
                      <Text
                        style={{
                          color: "#101928",
                          zIndex: 99,
                          width: 150,
                        }}
                      >
                        Owners Date of birth
                        <Text style={tw`text-[${COLORS.red}] relative`}>
                          {" "}
                          *
                        </Text>
                      </Text>
                      <InfoCircle
                        size={16}
                        fs="14px"
                        width="170px"
                        height="70px"
                        content="Required for account setup and identity verification."
                      />
                    </View>
                    <Text
                      style={{
                        color: dataCoporate?.dob === "" ? "#98A2B3" : "#101928",
                        marginLeft: 8,
                        width: "100%",
                      }}
                    >
                      {dataCoporate?.dob || "Select date"}
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
                        zIndex: 90,
                      }}
                    >
                      <TimePickertransparent
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
                            ? setDataCoporate({
                                ...dataCoporate,
                                dob: dobAnd,
                                dobReal: e,
                              })
                            : setDataCoporate({
                                ...dataCoporate,
                                dob: dobIos,
                                dobReal: e,
                              });
                        }}
                        showLabel
                        placeholder={""}
                        mode="date"
                        value={data?.dob}
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <InputField
                      infoContent={
                        "Required for secure transactions and account protection setup. You can change this at any time."
                      }
                      infoWidth={"190px"}
                      infoHeight={"80px"}
                      required
                      placheHolder="1234"
                      label="Transaction pin"
                      onChange={(e) =>
                        setDataCoporate({ ...dataCoporate, pin: e })
                      }
                      maxEntry={4}
                      infoSize={16}
                      infoFs={"14px"}
                    />
                    <Text style={tw`text-[#667085] text-[12px] my-2`}>
                      Pin must be 4 digits and will be used for withdrawal
                    </Text>
                  </View>
                </View>
              </ScrollView>
              {/*  */}
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "93%",
                  left: "3%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomButton
                  disabled={disableFn()}
                  onPress={() => {
                    createStore();
                  }}
                  loading={load}
                  label="Continue to vehicle listing"
                  IconR={
                    <Ionicons name="arrow-forward" size={20} color={"#fff"} />
                  }
                />
              </View>
            </>
          ))}
        {hostAccountCreated && (
          <View>
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
                Car list
              </Text>
            </View>

            <View
              style={{
                marginHorizontal: "3%",
                position: "relative",
              }}
            >
              <Ionicons
                name="search"
                size={22}
                color={"#667185"}
                style={{
                  position: "absolute",
                  zIndex: 99,
                  top: 20,
                  left: 10,
                }}
              />
              <InputField pl={40} label="" placheHolder="Search" />
            </View>
            <FlatList
              style={{
                marginHorizontal: "3%",
                marginTop: 20,
              }}
              ListFooterComponent={<View style={{ height: 300 }} />}
              data={carsListed}
              keyExtractor={(e) => e.sk}
              renderItem={({ item }) => (
                <Pressable
                  style={{
                    marginBottom: 20,
                    flexDirection: "row",
                    gap: 10,
                    position: "relative",
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                    paddingBottom: 15,
                  }}
                >
                  <Image
                    style={{
                      borderRadius: 8,
                    }}
                    height={78}
                    width={106}
                    source={{ uri: item.vehicle_images[0] }}
                  />
                  <View>
                    <Text style={{ fontWeight: "700", fontSize: 16 }}>
                      {item?.car_name} - {item?.car_year}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: 14,
                        marginVertical: 10,
                        flexDirection: "row",
                      }}
                    >
                      # {item?.price} /{" "}
                      <Text
                        style={{
                          fontWeight: "400",
                          color: "#344054",
                        }}
                      >
                        day
                      </Text>
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="star" color={"#F3A218"} size={14} />
                      <Text
                        style={{
                          fontWeight: "400",
                          color: "#344054",
                          fontSize: 12,
                        }}
                      >
                        4.7 (12 trips)
                      </Text>
                    </View>
                  </View>

                  {item?.status === "available" && (
                    <View
                      style={{
                        position: "absolute",
                        right: 0,
                        bottom: 15,
                        backgroundColor: "#E7F6EC",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 30,
                      }}
                    >
                      <Text
                        style={{
                          color: "#0F973D",
                          fontSize: 12,
                        }}
                      >
                        Availale
                      </Text>
                    </View>
                  )}
                  {item?.status === "booked" && (
                    <View
                      style={{
                        position: "absolute",
                        right: 0,
                        bottom: 15,
                        backgroundColor: "#E3EFFC",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 30,
                      }}
                    >
                      <Text
                        style={{
                          color: "#1038C3",
                          fontSize: 12,
                        }}
                      >
                        Booked
                      </Text>
                    </View>
                  )}
                  {item?.status === "unavailable" && (
                    <View
                      style={{
                        position: "absolute",
                        right: 0,
                        bottom: 15,
                        backgroundColor: "#FBEAE9",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 30,
                      }}
                    >
                      <Text
                        style={{
                          color: "#9E0A05",
                          fontSize: 12,
                        }}
                      >
                        Unavailable
                      </Text>
                    </View>
                  )}
                </Pressable>
              )}
            />
          </View>
        )}
      </>
    </ScreenWrapper>
  );
};

export default HostYouCars;
