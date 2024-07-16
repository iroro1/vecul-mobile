import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import DropDown from "../../../components/DropDown";
import useCamera from "../../../hooks/useCamera";
import useRefreshToken from "../../../hooks/useRefreshToken";
import {
  startRentalConditionApi,
  submitRentalConditionApi,
} from "../../../services/bookingService";
import { imageUploadApi } from "../../../services/coreService";
import { authSelector } from "../../../store/appSlice";
import { capitalize, delayFn, removeSeparators } from "../../../utils";
import ScreenWrapper from "../../ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import VeculAppLoader from "../../../components/VeculAppLoader";
import DropDownCustom from "./DropDownCustom";
import { Image } from "react-native";
import VCheckbox from "../../../components/VCheckbox";
import { COLORS } from "../../../utils/colors";
import { useRoute } from "@react-navigation/native";
import useToast from "../../../hooks/useToast";

const StartRentalScreen = (props) => {
  const { navigation, route } = props;
  const { callRefresh } = useRefreshToken();
  const userStore = useSelector(authSelector);
  const [partsList, setPartsList] = useState([]);
  const [data, setData] = useState({});
  const [arr, setArr] = useState([]);
  const [load, setLoad] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [loadImg, setLoadImg] = useState(false);
  const { camera, result } = useCamera();
  const bookingData = useRoute().params;
  const { toast } = useToast();

  const loadData = async () => {
    setLoad(true);
    try {
      const res = await startRentalConditionApi({}, userStore?.id_token);
      console.log(res, "res");
      if (res?.status === 200) {
        setArr(res?.data?.data?.name);
      } else {
        if (res?.response?.status === 401) {
          // callRefresh();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  useEffect(() => {
    loadData();
  }, []);
  const removeFn = (i) => {
    setPartsList(partsList.filter((p, index) => index !== i));
  };
  const startRentFn = async () => {
    setLoad(true);

    const pList = partsList.map((p) => {
      return {
        part_name: p?.sk,
        image: p?.image_url,
      };
    });

    const obj = {
      booking_id: bookingData?.data?.booking_id,
      parts: pList,
      status: "pickup",
      user_id: userStore?.sub,
    };

    console.log(obj, "obj", bookingData);
    try {
      const res = await submitRentalConditionApi(obj, userStore?.id_token);
      console.log(res, "resStart", userStore);
      if (res?.status === 200) {
        setShowModal(false);
        setSuccessModal(true);
      } else {
        toast("error", res?.response?.data?.message);
        if (res?.response?.status === 401) {
          // callRefresh();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  const uploadFn = async (e) => {
    setLoadImg(true);
    const dt = {
      user_id: userStore?.sub,
      contents: ["data:image/jpeg;base64," + e],
      folder: "car_condition",
    };
    try {
      const res = await imageUploadApi(dt, userStore?.id_token);
      console.log(res, "resImageupload");
      if (res?.status === 200) {
        //
        setData({
          ...data,
          image_url: res?.data?.data[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoadImg(false);
  };

  useEffect(() => {
    setLoadImg(true);
    delayFn(() => {
      setLoadImg(false);
    }, 2000);
  }, []);

  return (
    <ScreenWrapper>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          marginBottom: 30,
          marginHorizontal: "3%",
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
          Pickup condition
        </Text>
      </View>
      <Modal transparent visible={showModal} animationType="fade">
        <Pressable
          style={{
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "#00000010",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          // onPress={() => setShowModal(false)}
        >
          <View
            style={{
              height: 227,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              borderRadius: 10,
              width: "80%",
              alignSelf: "center",
              position: "relative",
              zIndex: 80,
            }}
          >
            <View
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                zIndex: 100,
                padding: 20,
                width: "100%",
                height: "100%",
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 24 }}>
                Start rental
              </Text>
              <Text style={{ marginTop: 10, color: "#667185" }}>
                Are you sure you want to start rental?
              </Text>
              <Pressable
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  gap: 10,
                  width: "90%",
                  alignItems: "flex-start",
                }}
              >
                <VCheckbox
                  onPress={() => setConfirmSubmit(confirmSubmit ? false : true)}
                  iconSize={18}
                  bg={COLORS.primary}
                />
                <Text style={{ color: "#667185" }}>
                  Check this box to confirm that you are picking up the vehicle
                  in the condition you have filed on the screen.
                </Text>
              </Pressable>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <CustomButton
                  style={{
                    width: "58%",
                    color: "#fff",
                    borderRadius: 6,
                    height: 40,
                  }}
                  loading={load}
                  textStyles={{
                    fontSize: 14,
                  }}
                  disabled={!confirmSubmit}
                  label="Yes, start rental"
                  onPress={() => {
                    console.log(confirmSubmit);
                    startRentFn();
                  }}
                />
                <CustomButton
                  style={{
                    width: "40%",
                    backgroundColor: COLORS.white,
                    color: "#fff",
                    fontSize: 14,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: "#034592",
                    height: 40,
                  }}
                  textStyles={{ color: "#034592" }}
                  label="Cancel"
                  onPress={() => {
                    setShowModal(false);
                  }}
                />
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
      <Modal transparent visible={successModal} animationType="fade">
        <Pressable
          style={{
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "#00000010",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 149,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              borderRadius: 10,
              width: "80%",
              alignSelf: "center",
              position: "relative",
              zIndex: 80,
            }}
          >
            <View
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                zIndex: 100,
                padding: 20,
                width: "100%",
                height: "100%",
              }}
            >
              <Text
                style={{ fontWeight: "600", fontSize: 18, textAlign: "center" }}
              >
                Success
              </Text>
              <Text
                style={{ marginTop: 10, color: "#667185", textAlign: "center" }}
              >
                Rental has started
              </Text>

              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <CustomButton
                  style={{
                    width: "100%",
                    color: "#fff",
                    fontSize: 14,
                    borderRadius: 6,
                    height: 40,
                  }}
                  label="Ok"
                  onPress={() => {
                    setSuccessModal(false);
                    navigation.goBack();
                  }}
                />
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
      {load ? (
        <VeculAppLoader />
      ) : (
        <KeyboardAwareScrollView
          style={{
            width: "100%",
            position: "relative",
            flex: 1,
            paddingBottom: 150,
            marginBottom: 80,
            marginHorizontal: "3%",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View style={{ width: "47%" }}>
              <DropDownCustom
                width="100%"
                placheHolder="Bumper"
                label="Vehicle part"
                value={data.sk?.toString().split("_").join(" ")}
                onChange={(e) =>
                  setData({
                    ...e,
                  })
                }
                data={arr}
              />

              <View style={{ marginTop: 10 }}>
                <Text style={{ color: "#101928", fontSize: 14 }}>
                  Upload vehicle part image
                </Text>

                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 59,
                    marginTop: 10,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: "#D0D5DD",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onPress={async () => {
                    const res = await camera();
                    uploadFn(res?.base64);
                    console.log(res, 33);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      height: 38,
                      width: 38,
                      borderRadius: 17,
                      backgroundColor: "#F0F2F5",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons size={18} name="cloud-upload-outline" />
                  </View>

                  <Text style={{ fontSize: 14, width: 90 }}>Upload image</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: "44%",
                height: "85%",
                marginTop: "5%",
                borderWidth: 1,
                borderColor: "#D0D5DD",
                borderRadius: 8,
                marginRight: "6%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loadImg && <ActivityIndicator size="small" color="#101928" />}
              {!loadImg && data?.image_url ? (
                <Image
                  source={{ uri: data?.image_url }}
                  width={"100%"}
                  height={"100%"}
                  resizeMode="contain"
                />
              ) : (
                !loadImg && (
                  <Image
                    source={require("../../../assets/images/carpartempty.png")}
                    width={"100%"}
                    height={"100%"}
                    resizeMode="cover"
                  />
                )
              )}
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <CustomButton
              style={{
                width: "95%",
                height: 40,
                borderWidth: 1,
                backgroundColor: "#fff",
                borderColor: "#D0D5DD",
              }}
              textStyles={{
                color: "#101928",
              }}
              Icon={<Ionicons name="add-outline" size={18} color="#101928" />}
              label="Add vehicle part"
              onPress={() => {
                if (!data?.sk || data?.image_url.includes("theengineer")) {
                  toast("error", "Please upload an image");
                  return;
                }
                setPartsList([
                  ...partsList,
                  {
                    ...data,
                  },
                ]);
                setData({});
              }}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            {partsList.map((item, index) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 20,
                  marginRight: "3%",
                  height: 53,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#D0D5DD",
                  paddingHorizontal: 10,
                  marginBottom: 15,
                  borderStyle: "dashed",
                }}
                key={index}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <View
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: "#0F973D10",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 15,
                    }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color="#0F973D"
                    />
                  </View>

                  <Text
                    style={{ color: "#101928", fontSize: 14, width: "60%" }}
                  >
                    {index + 1}.{" "}
                    {capitalize(item?.sk?.toString().split("_").join(" "))}
                  </Text>
                </View>

                <Ionicons
                  onPress={() => removeFn(index)}
                  name="trash"
                  size={18}
                  color={COLORS.red}
                />
              </TouchableOpacity>
            ))}
          </View>
        </KeyboardAwareScrollView>
      )}
      <View style={{ marginBottom: 20, marginHorizontal: "3%" }}>
        <Text
          style={{
            color: "#667185",
            fontSize: 12,
            marginBottom: 10,
            textAlign: "center",
            width: "80%",
            marginHorizontal: "auto",
          }}
        >
          Please carefully review and confirm the condition of the vehicle
          before starting your rental. Your confirmation ensures a smooth and
          transparent rental experience for both you and the vehicle owner.
        </Text>
        <CustomButton
          style={{
            width: "100%",
            height: 40,
            borderWidth: 1,
            borderColor: "#D0D5DD",
            marginTop: "auto",
          }}
          disabled={partsList.length === 0}
          label="Start Rental"
          onPress={() => {
            setShowModal(true);
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default StartRentalScreen;
