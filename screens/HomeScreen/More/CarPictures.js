import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import ImagePickerCustom from "../../../components/ImagePickerCustom";
import VeculAppLoader from "../../../components/VeculAppLoader";
import useAuth from "../../../hooks/useAuth";
import { imageUploadApi } from "../../../services/coreService";
import {
  ADD_CAR_DATA_CREATE,
  authSelector,
  newCarSelector,
} from "../../../store/appSlice";
import { delayFn } from "../../../utils";
import { COLORS } from "../../../utils/colors";
import ScreenWrapper from "../../ScreenWrapper";

const CarPictures = (props) => {
  const { navigation, route } = props;
  const userStore = useSelector(authSelector);
  const { setterAuth, userData } = useAuth();
  const newCarData = useSelector(newCarSelector);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    car_pictures: [],
  });
  const [err, setErr] = useState({
    car_pictures: false,
  });

  const [load, setLoad] = useState(false);
  const submitAddress = async () => {
    setLoad(true);
    const obj = {
      car_pictures: data.car_pictures,
    };
    try {
      dispatch(
        ADD_CAR_DATA_CREATE({
          ...userData?.newCarData,
          ...obj,
        })
      );
      // Save to local Store
      setterAuth({
        ...userData,
        newCarData: {
          ...userData?.newCarData,
          ...obj,
        },
      });

      delayFn(() => {
        navigation.navigate("OwnersCondition");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  const [imgs, setImgs] = useState([]);

  const uploadFn = async (e) => {
    setLoad(true);
    const arr = e.map((file) => file?.img);
    const dt = {
      user_id: userStore?.sub,
      contents: arr,
    };

    try {
      const res = await imageUploadApi(dt, userStore?.id_token);

      if (res?.status === 200) {
        const obj = {
          ...data,
          car_pictures: data?.car_pictures
            ? [...data?.car_pictures, ...res?.data?.data]
            : res?.data?.data,
        };
        setData(obj);
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  useEffect(() => {
    setLoad(true);
    delayFn(() => {
      setData({ ...newCarData });
      setLoad(false);
    }, 2000);
  }, []);
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
          Vehicle pictures
        </Text>
      </View>

      {load ? (
        <VeculAppLoader />
      ) : (
        <View
          style={{
            marginTop: 23,
            flex: 1,
            marginHorizontal: "3%",
          }}
        >
          <ImagePickerCustom
            height={167}
            borderColor="#D0D5DD"
            backgroundColor="#fff"
            allowsMultipleSelection={true}
            chosenImg={(e) => {
              const arr = [];
              const arr2 = [];

              e?.multi?.assets.forEach((im) => {
                arr.push({
                  img: "data:image/jpeg;base64," + im?.base64,
                  file: im,
                });
                arr2.push(im);
              });
              setImgs([...imgs, ...arr2]);

              // Upload Fn
              uploadFn(arr);
              if (
                data?.car_pictures?.length + e?.multi?.assets.length < 4 ||
                data?.car_pictures?.length + e?.multi?.assets.length > 20
              )
                setErr({ ...err, car_pictures: true });
              else setErr({ ...err, car_pictures: false });
            }}
            type="Images"
            iconBg="#F0F2F5"
            iconH={50}
            iconW={50}
            iconRad={25}
            Icon={
              <Ionicons
                color={err?.car_pictures ? "#fff" : "#475367"}
                name="cloud-upload-outline"
                size={24}
              />
            }
            label={
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: COLORS.primary,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    position: "relative",
                    marginBottom: 5,
                  }}
                  allowFontScaling={false}
                >
                  Tap to Upload{" "}
                  <Text
                    style={{
                      color: "#2D2D2D",
                    }}
                    allowFontScaling={false}
                  >
                    PNG, JPG or JPEG
                  </Text>
                </Text>
                <Text style={{ fontSize: 12, color: "#98A2B3" }}>
                  Upload min of 4 and max of 20 pictures
                </Text>
              </View>
            }
            err={err?.car_pictures}
          />

          {data?.car_pictures?.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  color: "#667185",
                  fontWeight: "500",
                  fontSize: 14,
                }}
              >
                Uploaded Files{" "}
              </Text>
              <View
                style={{
                  backgroundColor: "#1671D9",
                  height: 25,
                  width: 25,
                  borderRadius: 25 / 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "500",
                    fontSize: 14,
                  }}
                >
                  {data?.car_pictures?.length}
                </Text>
              </View>
            </View>
          )}

          <ScrollView
            contentContainerStyle={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            {data?.car_pictures?.map((im, i) => (
              <View
                style={{
                  position: "relative",
                  overflow: "visible",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                  width: "45%",
                }}
                key={i}
              >
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    zIndex: 99,
                    right: -0,
                    bottom: -7,
                    backgroundColor: "#FBEAE9",
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    padding: 4,
                  }}
                  onPress={() => {
                    let arr = [...data?.car_pictures];
                    let arr2 = [...imgs];
                    arr.splice(i, 1);
                    arr2.splice(i, 1);
                    setData({
                      ...data,
                      car_pictures: arr,
                    });
                    setImgs(arr2);
                    if (
                      data?.car_pictures?.length - 1 < 4 ||
                      data?.car_pictures?.length - 1 > 10
                    )
                      setErr({ ...err, car_pictures: true });
                    else setErr({ ...err, car_pictures: false });
                  }}
                >
                  <Ionicons name="trash-bin-outline" size={14} color="red" />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 10,
                  }}
                >
                  <Image
                    resizeMode="cover"
                    style={{ minWidth: "100%", height: 121, borderRadius: 6 }}
                    source={{
                      uri:
                        data?.car_pictures[i] ||
                        "data:image/jpeg;base64," + im.base64,
                    }}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          left: 0,
          paddingHorizontal: "3%",
          marginTop: 10,
        }}
      >
        <CustomButton
          disabled={data?.car_pictures?.length <= 3}
          onPress={() => {
            submitAddress();
          }}
          label="Next"
          IconR={<Ionicons name="arrow-forward" size={20} color={"#fff"} />}
        />
      </View>
    </ScreenWrapper>
  );
};

export default CarPictures;
