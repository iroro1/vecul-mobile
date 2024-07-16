import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../../components/Avatar";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import useAuth from "../../../hooks/useAuth";
import useShare from "../../../hooks/useShare";
import { getStoreApi } from "../../../services/coreService";
import { SET_AUTH_STATE, authSelector } from "../../../store/appSlice";
import ScreenWrapper from "../../ScreenWrapper";

const MoreHome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [logOut, setLogOut] = useState(false);
  const [firstTimeHost, setFirstTimeHost] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [loadHost, setLoadHost] = useState(false);
  const userStore = useSelector(authSelector);
  const goToHost = async () => {
    setLoadHost(true);
    try {
      const res = await getStoreApi(userStore?.id_token);
      console.log(res);
      if (res?.data?.success) {
        dispatch(SET_AUTH_STATE({ ...userStore, hasHostAccount: true }));
        navigation.navigate("VehicleAddress", {
          path: "More",
          hostAccountCreated: false,
        });
      } else {
        setFirstTimeHost(true);
        dispatch(SET_AUTH_STATE({ ...userStore, hasHostAccount: false }));
      }
    } catch (error) {
      console.log(error);
    }
    setLoadHost(false);
  };
  const { logOutFn, userData } = useAuth();
  const { onShare } = useShare();
  return (
    <ScreenWrapper dismissKeyboard={false}>
      <Modal transparent animationType="slide" visible={logOut}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "#00000099",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setLogOut(false);
          }}
        >
          <View
            style={{
              height: 127,
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
                fontSize: 16,
              }}
            >
              Log out
            </Text>
            <Text
              style={{
                color: "#667185",
                fontWeight: "400",
                fontSize: 14,
                marginTop: 4,
              }}
            >
              Are you sure you want to log out of your account?
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                position: "absolute",
                bottom: 10,
                width: "100%",
                left: 15,
              }}
            >
              <CustomButton
                style={{
                  width: "45%",
                  backgroundColor: "transparent",
                  borderColor: "#D0D5DD",
                  borderWidth: 1,
                  height: 44,
                }}
                textStyles={{
                  color: "#344054",
                }}
                label="Yes, log out"
                onPress={() => {
                  dispatch(SET_AUTH_STATE({}));
                  logOutFn();
                  navigation.replace("HomeScreen");
                }}
              />
              <CustomButton
                style={{
                  width: "45%",
                  height: 44,
                }}
                label="No"
                onPress={() => {
                  setLogOut(false);
                }}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
      <Modal transparent animationType="slide" visible={firstTimeHost}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BackButton onPress={() => setFirstTimeHost(false)} />
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              height={335}
              resizeMode="cover"
              source={require("../../../assets/moreIcons/hostFirst.png")}
            />

            <Text
              style={{
                color: "#000",
                textAlign: "center",
                width: 299,
                fontWeight: "600",
                fontSize: 25,
              }}
            >
              Become a host
            </Text>
            <Text
              style={{
                color: "#667185",
                textAlign: "center",
                width: 299,
              }}
            >
              Start earning with you car today when you list them on Vecul
            </Text>
          </View>
          <View
            style={{
              marginTop: 30,
              width: "100%",
              paddingHorizontal: "3%",
            }}
          >
            <CustomButton
              style={{
                width: "100%",
              }}
              label="Get started"
              IconR={<Ionicons name="arrow-forward" color={"#fff"} size={18} />}
              onPress={() => {
                if (isVerified) {
                  setFirstTimeHost(false);
                  dispatch(
                    SET_AUTH_STATE({ ...userStore, hasHostAccount: false })
                  );
                  navigation.navigate("HostingAs");
                } else {
                  setFirstTimeHost(false);
                  navigation.navigate("AccountVerification");
                }
              }}
            />
          </View>
        </View>
      </Modal>
      <View
        style={{
          marginHorizontal: Platform.OS === "ios" ? "3%" : 0,
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <Avatar
          styles={{
            borderWidth: 1,
            borderColor: "#ddd",
          }}
          size={80}
          imgUri={userStore?.picture}
        />
        <View>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 20,
              marginTop: 15,
            }}
          >
            {(userStore || userData)?.given_name}{" "}
            {(userStore || userData)?.family_name}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Ionicons name="star" color={"#F3A218"} size={20} />
            <Text
              style={{
                fontSize: 16,
                color: "#344054",
              }}
            >
              {userStore?.rating || 0}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#001633",
          borderRadius: 8,
          height: 150,
          marginHorizontal: Platform.OS === "ios" ? "3%" : 0,
          marginTop: 16,
          position: "relative",
          padding: 10,
        }}
      >
        <Image
          style={{
            height: 80,
            width: 100,
            position: "absolute",
            right: 0,
          }}
          source={require("../../../assets/images/carMore.png")}
        />
        <Text
          style={{
            width: 175,
            color: "#fff",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Want to start earning with Vecul?
        </Text>
        <Text
          style={{
            width: 270,
            color: "#fff",
            fontSize: 14,
            fontWeight: "400",
            marginTop: 5,
          }}
        >
          Turn your cars to assets by listing them on Vecul for rentals.
        </Text>

        <CustomButton
          loading={loadHost}
          style={{
            position: "absolute",
            width: loadHost ? 145 : 120,
            bottom: 15,
            right: 15,
            height: 40,
          }}
          textStyles={{
            fontSize: 16,
            fontWeight: "700",
          }}
          label="Start listing"
          onPress={() => goToHost()}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: Platform.OS === "ios" ? "3%" : 0,
          marginTop: 16,
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
          onPress={() => navigation.navigate("PersonalInfo")}
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
            <Image source={require("../../../assets/moreIcons/icon1.png")} />
          </View>
          <Text style={{ color: "#101928", fontSize: 16, width: "100%" }}>
            Account information
          </Text>
          {/* <View
                style={{
                  position: "absolute",
                  right: 20,
                  height: 17,
                  width: 83,
                  backgroundColor: "#F3A218",
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
                  Not verified
                </Text>
              </View> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
          onPress={() => navigation.navigate("HostFeatures")}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              width: 40,
              backgroundColor: "#F4ECFF",
              borderRadius: 20,
              borderColor: "#ccc",
            }}
          >
            <Image source={require("../../../assets/moreIcons/host.png")} />
          </View>
          <Text style={{ color: "#101928", fontSize: 16, width: "100%" }}>
            Host
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
          onPress={() =>
            onShare(
              "Looking for a reliable car rental platform? Check out Vecul! Whether you need to rent a car or list your own for others to rent, Vecul makes it easy and secure. Download the app now and start your journey with us!",
              `https://vecul.co/download`,
              "Join me on Vecul! 🚗✨"
            )
          }
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
            <Image source={require("../../../assets/moreIcons/user-add.png")} />
          </View>
          <Text style={{ color: "#101928", fontSize: 16, width: "100%" }}>
            Invite friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
          onPress={() =>
            Linking.openURL(
              "mailto:info@vecul.co?subject=Enter_your_Title&body=Enter_your_content_in_details"
            )
          }
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              width: 40,
              backgroundColor: "#E7F6EC",
              borderRadius: 20,
              //   borderWidth: 1,
              borderColor: "#ccc",
            }}
          >
            <Image
              source={require("../../../assets/moreIcons/question-circle.png")}
            />
          </View>
          <Text style={{ color: "#101928", fontSize: 16, width: "100%" }}>
            Contact support
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
          onPress={() => setLogOut(true)}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              width: 40,
              backgroundColor: "#FBEAE9",
              borderRadius: 20,
              //   borderWidth: 1,
              borderColor: "#ccc",
            }}
          >
            <Image source={require("../../../assets/moreIcons/sign-out.png")} />
          </View>
          <Text style={{ color: "#101928", fontSize: 16, width: "100%" }}>
            Log out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default MoreHome;
