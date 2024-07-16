import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import ScreenWrapper from "../../ScreenWrapper";
import useToast from "../../../hooks/useToast";
import { getRentalConditionApi } from "../../../services/bookingService";
import VeculAppLoader from "../../../components/VeculAppLoader";
import { Image } from "react-native";
import { capitalize } from "../../../utils";
import NotFound from "../../../components/NotFound";

const PickupCondition = (props) => {
  const { navigation, route } = props;
  const { params } = route;

  const userStore = useSelector((state) => state?.app?.authState?.userResponse);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState("");
  const [data, setData] = useState({});
  const { toast } = useToast();
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getRentalConditionApi(
        {
          status: "pickup",
          booking_id: params?.data?.booking_id,
        },
        userStore?.id_token
      );
      console.log(res, "res");
      if (res?.status === 200) {
        setData(res?.data?.data);
      } else {
        toast("error", "error", res?.response?.data?.message, 3000);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);

  console.log(data, "data");
  return (
    <ScreenWrapper>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          marginBottom: 30,
          marginLeft: "3%",
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
      <Modal
        visible={modal !== ""}
        animationType="fade"
        style={{
          backgroundColor: "#000",
          padding: 40,
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#000",
            padding: 10,
            flex: 1,
          }}
          onPress={() => setModal("")}
        >
          <Image
            source={{ uri: modal?.image }}
            height={"100%"}
            width={"94%"}
            resizeMode="contain"
            style={{
              borderRadius: 10,
              marginHorizontal: "3%",
            }}
          />
        </Pressable>
      </Modal>
      {loading ? (
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
          {/*  */}
          {data?.parts?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                marginBottom: 20,
                flexDirection: "row",
                width: "100%",
                gap: 10,
                alignItems: "center",
              }}
              onPress={() => setModal(item)}
            >
              <Image
                resizeMode="contain"
                style={{ borderRadius: 10 }}
                width={85}
                height={63}
                source={{ uri: item?.image }}
              />

              <Text style={{ fontSize: 16, width: "70%" }}>
                {capitalize(item?.part_name)}
              </Text>
            </TouchableOpacity>
          ))}
          {data === undefined && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                height: "100%",
                alignItems: "center",
                marginTop: "50%",
              }}
            >
              <NotFound
                title={"No Vehicle Parts"}
                subTitle={
                  "There was no vehicle part found. Peharps they has been an issue. Go back and try to access this screen again."
                }
              ></NotFound>
            </View>
          )}
        </KeyboardAwareScrollView>
      )}
    </ScreenWrapper>
  );
};

export default PickupCondition;
