import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import VeculAppLoader from "../../../components/VeculAppLoader";
import useAuth from "../../../hooks/useAuth";
import { deleteAccountApi } from "../../../services/coreService";
import { licenseStatusApi } from "../../../services/verificationService";
import { SET_AUTH_STATE, authSelector } from "../../../store/appSlice";
import { COLORS } from "../../../utils/colors";
import ScreenWrapper from "../../ScreenWrapper";
import TextCustom from "../../../components/TextCustom";

const PersonalInfo = () => {
  const navigation = useNavigation();
  const [delAcc, setDelAcc] = useState(false);
  const dispatch = useDispatch();
  const { logOutFn } = useAuth();
  const userStore = useSelector(authSelector);
  const [load, setLoad] = useState(false);
  const [loadDel, setLoadDel] = useState(false);
  const [verified, setVerified] = useState({
    nin: userStore?.nin || false,
    drivers: userStore?.license || false,
  });

  const statusCheck = async () => {
    setLoad(true);
    try {
      const res = await licenseStatusApi(
        { user_id: userStore?.sub },
        userStore?.id_token
      );

      if (res?.status === 200) {
        //
        const obj = {
          nin: res?.data.message?.nin.includes("not") ? false : true,
          drivers: res?.data.message?.license.includes("not") ? false : true,
        };

        if (res?.messsage?.license.includes("not")) {
          obj.drivers = false;
        } else if (res?.messsage?.nin.includes("not")) {
          obj.nin = false;
        }

        setVerified(obj);
      } else {
        //
      }
    } catch (error) {
      console.log(error);
    }

    setLoad(false);
  };
  const deleteAccountFn = async () => {
    setLoadDel(true);
    try {
      const res = await deleteAccountApi(
        { disable: true },
        userStore?.id_token
      );
      if (res?.status === 200) {
        //
        dispatch(SET_AUTH_STATE({}));
        logOutFn();
        navigation.replace("HomeScreen");
      }
    } catch (error) {
      console.log(error);
    }

    setDelAcc(false);
    setLoadDel(false);
  };
  useEffect(() => {
    statusCheck();
  }, []);

  return (
    <ScreenWrapper dismissKeyboard={false}>
      {load ? (
        <VeculAppLoader />
      ) : (
        <>
          <Modal transparent animationType="slide" visible={delAcc}>
            <Pressable
              style={{
                flex: 1,
                backgroundColor: "#00000099",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setDelAcc(false);
              }}
            >
              <View
                style={{
                  height: 159,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  width: "90%",
                  padding: 15,
                }}
              >
                <Text
                  style={{
                    color: "#1F1F1F",
                    fontWeight: "600",
                    fontSize: 18,
                  }}
                >
                  Delete Account
                </Text>
                <TextCustom
                  style={{
                    color: "#667185",
                    fontWeight: "400",
                    fontSize: 16,
                    marginTop: 4,
                  }}
                >
                  Your account will be permanently removed from our server and
                  all your data would be erased.
                </TextCustom>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "absolute",
                    bottom: 15,
                    width: "100%",
                    left: 15,
                  }}
                >
                  <CustomButton
                    style={{
                      width: "45%",
                      backgroundColor: "transparent",
                      borderColor: "#D42620",
                      borderWidth: 1,
                      height: 40,
                    }}
                    textStyles={{
                      color: "#D42620",
                    }}
                    loaderColor={COLORS.red}
                    label="Delete account"
                    loading={loadDel}
                    onPress={() => {
                      deleteAccountFn();
                    }}
                  />
                  <CustomButton
                    style={{
                      width: "45%",
                      height: 40,
                    }}
                    label="Cancel"
                    onPress={() => {
                      setDelAcc(false);
                    }}
                  />
                </View>
              </View>
            </Pressable>
          </Modal>
          <View
            style={{
              marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
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
              Account information
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",
              gap: 20,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                position: "relative",
              }}
              onPress={() => navigation.navigate("AccountPersonal")}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                  width: 40,
                  backgroundColor: "#E3EFFC",
                  borderRadius: 20,
                  borderColor: "#ccc",
                }}
              >
                <Image
                  source={require("../../../assets/moreIcons/icon1.png")}
                />
              </View>
              <Text style={{ color: "#101928", fontSize: 16, width: "100%" }}>
                Personal information
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                position: "relative",
              }}
              onPress={() => navigation.navigate("AccountVerification")}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                  width: 40,
                  backgroundColor: "#E3EFFC",
                  borderRadius: 20,
                  //   borderWidth: 1,
                  borderColor: "#ccc",
                }}
              >
                <Image source={require("../../../assets/moreIcons/file.png")} />
              </View>
              <Text style={{ color: "#101928", fontSize: 16, width: "100%" }}>
                Account verification
              </Text>
              <View
                style={{
                  position: "absolute",
                  right: 20,
                  height: 17,
                  width: verified?.drivers && verified?.nin ? 60 : 83,
                  backgroundColor:
                    verified?.drivers && verified?.nin ? "#0F973D" : "#F3A218",
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  {verified?.drivers || verified?.nin
                    ? "Verified"
                    : "Not verified"}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                position: "relative",
              }}
              onPress={() => navigation.navigate("ChangePassword")}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                  width: 40,
                  backgroundColor: "#E3EFFC",
                  borderRadius: 20,
                  //   borderWidth: 1,
                  borderColor: "#ccc",
                }}
              >
                <Image source={require("../../../assets/moreIcons/key.png")} />
              </View>
              <Text style={{ color: "#101928", fontSize: 16, width: "100%" }}>
                Change pasword
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                position: "relative",
              }}
              onPress={() => {
                setDelAcc(true);
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                  width: 40,
                  backgroundColor: "#FBEAE9",
                  borderRadius: 20,
                  borderColor: "#ccc",
                }}
              >
                <Image source={require("../../../assets/moreIcons/bin.png")} />
              </View>
              <Text style={{ color: "#101928", fontSize: 16, width: "100%" }}>
                Delete account
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScreenWrapper>
  );
};

export default PersonalInfo;
