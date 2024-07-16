import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import VeculAppLoader from "../../../components/VeculAppLoader";
import { licenseStatusApi } from "../../../services/verificationService";
import { authSelector } from "../../../store/appSlice";
import ScreenWrapper from "../../ScreenWrapper";

const AccountVerification = () => {
  const navigation = useNavigation();
  const userStore = useSelector(authSelector);
  const [verified, setVerified] = useState({
    nin: userStore?.nin || false,
    drivers: userStore?.license || false,
  });
  const [load, setLoad] = useState(false);

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
  useEffect(() => {
    statusCheck();
  }, []);

  return (
    <ScreenWrapper dismissKeyboard={false}>
      {load ? (
        <VeculAppLoader />
      ) : (
        <>
          <View
            style={{
              marginHorizontal: Platform.OS === "ios" ? "5%" : "0%",
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
                width: "100%",
              }}
            >
              Account verification
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: Platform.OS === "ios" ? "5%" : "0%",
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
              onPress={() => navigation.navigate("BVN")}
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
                <Image source={require("../../../assets/moreIcons/file.png")} />
              </View>
              <Text style={{ color: "#101928", fontSize: 16, width: "100%" }}>
                NIN
              </Text>
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  height: 17,
                  width: verified?.nin ? 60 : 83,
                  backgroundColor: verified?.nin ? "#0F973D" : "#F3A218",
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
                  {verified?.nin ? "Verified" : "Not verified"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                position: "relative",
                marginBottom: 0,
              }}
              onPress={() => navigation.navigate("DriversLicense")}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                  width: 40,
                  backgroundColor: "#E7F6EC",
                  borderRadius: 20,
                  borderColor: "#ccc",
                }}
              >
                <Image
                  source={require("../../../assets/moreIcons/personalcard.png")}
                />
              </View>
              <Text style={{ color: "#101928", fontSize: 16, width: "100%" }}>
                Driver's License
              </Text>
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  height: 17,
                  width: verified?.drivers ? 60 : 83,
                  backgroundColor: verified?.drivers ? "#0F973D" : "#F3A218",
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
                  {verified?.drivers ? "Verified" : "Not verified"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScreenWrapper>
  );
};

export default AccountVerification;
