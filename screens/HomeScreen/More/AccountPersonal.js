import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { err } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import InputField from "../../../components/InputField";
import useAuth from "../../../hooks/useAuth";
import useCamera from "../../../hooks/useCamera";
import useToast from "../../../hooks/useToast";
import {
  imageUploadApi,
  updatePersonalInfoApi,
} from "../../../services/coreService";
import { SET_AUTH_STATE, authSelector } from "../../../store/appSlice";
import { delayFn } from "../../../utils";
import { COLORS } from "../../../utils/colors";
import ScreenWrapper from "../../ScreenWrapper";

const AccountPersonal = () => {
  const navigation = useNavigation();
  const pInfo = useSelector(authSelector);
  const dispattch = useDispatch();
  const { toast } = useToast();
  const { userData, setterAuth } = useAuth();
  const [img, setImg] = useState(pInfo?.picture);
  const [load, setLoad] = useState(false);
  const [loadImg, setLoadImg] = useState(false);
  const [data, setData] = useState({
    name: pInfo.given_name + " " + pInfo.family_name,
    email: pInfo?.email,
    fName: pInfo.given_name,
    lName: pInfo.family_name,
  });
  const { pickImage, result } = useCamera();

  const imgUpload = async (val) => {
    setLoadImg(true);
    const obj = {
      user_id: pInfo?.sub,
      contents: [val],
      folder: "profile",
    };
    try {
      const res = await imageUploadApi(obj, pInfo?.id_token);
      if (res?.status === 200) {
        toast("success", "Profile Image updated successfully");
        setImg(res?.data?.data[0]);
        dispattch(SET_AUTH_STATE({ ...pInfo, picture: res?.data?.data[0] }));
        setterAuth({ ...userData, picture: res?.data?.data[0] });
      }
    } catch (error) {
      console.log(error);
    }
    setLoadImg(false);
  };
  useEffect(() => {
    imgUpload(result?.img);
  }, [result]);

  // const {callApi,response,loading}=useApi()
  const saveChangesFn = async () => {
    setLoad(true);
    try {
      const res = await updatePersonalInfoApi(
        {
          first_name: data?.fName,
          last_name: data?.lName,
        },
        pInfo?.id_token
      );
      if (res?.status === 200) {
        toast("success", "Profile updated successfully");

        dispattch(
          SET_AUTH_STATE({
            ...pInfo,
            given_name: data?.fName,
            family_name: data?.lName,
          })
        );
        setterAuth({
          ...userData,
          given_name: data?.fName,
          family_name: data?.lName,
        });
        delayFn(() => {
          navigation.goBack();
        }, 2000);
      } else {
        toast(
          "error",
          "Profile update failed",
          "There was an issue. Please try again later"
        );
      }
    } catch (error) {
      console.log(err);
    }
    setLoad(false);
  };

  return (
    <ScreenWrapper dismissKeyboard={false}>
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
          Personal information
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          marginHorizontal: "3%",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              height: 126,
              width: 126,
              backgroundColor: "#B6D8FF",
              borderRadius: 126 / 2,
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
            onPress={async () => {
              await pickImage();
            }}
          >
            {loadImg ? (
              <View>
                <ActivityIndicator
                  style={{ marginLeft: 0 }}
                  color={COLORS.red}
                  size="small"
                />
              </View>
            ) : (
              <>
                {img ? (
                  <Image
                    source={{ uri: img }}
                    style={{
                      height: 126,
                      width: 126,
                      borderRadius: 126 / 2,
                      borderWidth: 1,
                      borderColor: "#eee",
                      resizeMode: "cover",
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 40,
                      fontWeight: "700",
                    }}
                  >
                    {data?.name.split(" ")[0][0]} {data?.name.split(" ")[1][0]}
                  </Text>
                )}
              </>
            )}

            <View
              style={{
                width: 24,
                height: 24,
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
              <Ionicons size={14} name="camera" color={"#fff"} />
            </View>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: 30,
          }}
        >
          <View>
            <InputField
              value={data?.email}
              disabled
              label="Email"
              placheHolder="henry@mail.com"
            />
          </View>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <InputField
              placheHolder="Henry"
              onChange={(e) => setData({ ...data, fName: e })}
              value={data?.fName}
            />
            <Text
              style={{
                color: "#667185",
                fontSize: 12,
                marginTop: 4,
              }}
            >
              Make sure this matches your driver's license
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <InputField
              label="Last name"
              placheHolder="Ninth"
              onChange={(e) => setData({ ...data, lName: e })}
              value={data?.lName}
            />
            <Text
              style={{
                color: "#667185",
                fontSize: 12,
                marginTop: 4,
              }}
            >
              Make sure this matches your driver's license
            </Text>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            bottom: 10,
            width: "100%",
          }}
        >
          <CustomButton
            loading={load}
            label="Save changes"
            onPress={saveChangesFn}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default AccountPersonal;
