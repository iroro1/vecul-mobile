import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Platform, Text, View } from "react-native";
import { useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import PasswordInputField from "../../../components/PasswordInputField";
import useToast from "../../../hooks/useToast";
import { changePasswordApi } from "../../../services/coreService";
import { authSelector } from "../../../store/appSlice";
import ScreenWrapper from "../../ScreenWrapper";

const ChangePassword = () => {
  const navigation = useNavigation();
  const userStore = useSelector(authSelector);
  const { toast } = useToast();
  const [data, setData] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });
  const disabledFn = () => {
    const { oldPass, newPass, confirmPass } = data;
    if (oldPass === "" || newPass === "" || confirmPass === "") return true;
    else if (newPass !== confirmPass) return true;
    return false;
  };
  const [load, setLoad] = useState(false);
  const submitFn = async () => {
    setLoad(true);
    try {
      const res = await changePasswordApi(
        {
          previous_password: data?.oldPass,
          proposed_password: data?.newPass,
          access_token: userStore?.access_token,
        },
        userStore?.id_token
      );
      console.log(res, "pis");
      if (res?.status === 200) {
        toast("success", res?.data?.message);
        setData({
          oldPass: "",
          newPass: "",
          confirmPass: "",
        });
      } else {
        toast("error", "We encountered an error, please try again");
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  return (
    <ScreenWrapper dismissKeyboard={false}>
      <View
        style={{
          marginHorizontal: Platform.OS === "ios" ? "5%" : "0%",

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
          Change password
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: Platform.OS === "ios" ? "5%" : "0%",
          flex: 1,
        }}
      >
        <View>
          <PasswordInputField
            value={data?.oldPass}
            label="Old password"
            placheHolder={"Password"}
            onChange={(e) => setData({ ...data, oldPass: e })}
          />
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <PasswordInputField
            value={data.newPass}
            label="New password"
            placheHolder={"Password"}
            onChange={(e) => setData({ ...data, newPass: e })}
          />
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <PasswordInputField
            label="Confirm new password"
            value={data.confirmPass}
            placheHolder={"Password"}
            onChange={(e) => setData({ ...data, confirmPass: e })}
          />
        </View>
        <View
          style={{
            position: "absolute",
            width: "100%",
            bottom: 20,
          }}
        >
          <CustomButton
            loading={load}
            disabled={disabledFn()}
            label="Change password"
            onPress={submitFn}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ChangePassword;
