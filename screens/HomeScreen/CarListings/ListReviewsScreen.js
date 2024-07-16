import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import tw from "twrnc";
import Avatar from "../../../components/Avatar";
import BackButton from "../../../components/BackButton";
import Stars from "../../../components/Stars";
import VeculAppLoader from "../../../components/VeculAppLoader";
import useAuth from "../../../hooks/useAuth";
import useRefreshToken from "../../../hooks/useRefreshToken";
import { listReviewApi } from "../../../services/reviewsService";
import { authSelector } from "../../../store/appSlice";
import { epochToDate } from "../../../utils";
import ScreenWrapper from "../../ScreenWrapper";

const ListReviewsScreen = () => {
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);
  const [load, setLoad] = useState(true);
  const { userData } = useAuth();
  const userStore = useSelector(authSelector);
  const { callRefresh } = useRefreshToken();

  const id = useRoute()?.params?.id;
  const loadReviews = async () => {
    try {
      const res = await listReviewApi(
        {
          car_id: id,
        },
        (userData || userStore)?.id_token
      );

      if (res?.status === 200) {
        setReviews(res?.data?.data?.cars);
      } else if (res?.response?.status === 401) {
        callRefresh();
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <ScreenWrapper dismissKeyboard={false}>
      <View style={tw`relative flex-row items-center mx-3  gap-2`}>
        <BackButton
          bg="#F0F2F5"
          iconColor="#475367"
          size={25}
          type={2}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={tw`text-[#101928] font-700 text-[16px] font-[Poppins_400Regular]`}
        >
          Reviews
        </Text>
      </View>
      {load ? (
        <VeculAppLoader />
      ) : (
        <ScrollView
          style={{
            marginTop: 50,
            flex: 1,
          }}
        >
          {reviews.map((rev, i) => (
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                borderTopWidth: i === 0 ? 0 : 1,
                marginRight: 10,
                borderColor: "#E4E7EC",
                padding: 10,
                gap: 10,
                width: "90%",
                borderRadius: 4,
                marginHorizontal: "4%",
                paddingTop: i === 0 ? 0 : 20,
              }}
              key={i}
            >
              <Avatar size={40} />
              <View
                style={{
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: 10,
                    width: "90%",
                  }}
                >
                  <Stars rating={rev?.rate} size={13} showNum={false} />
                  <Text
                    style={{
                      color: "#475367",
                      fontSize: 12,
                      // fontFamily: "Poppins_400Regular",
                    }}
                  >
                    {epochToDate(rev?.created_at)}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#101928",
                    fontSize: 16,
                    fontWeight: "900",
                    // fontFamily: "Poppins_400Regular",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                >
                  {rev?.reviewed_by?.given_name} {rev?.reviewed_by?.family_name}
                </Text>
                <Text
                  style={{
                    color: "#101928",
                    fontSize: 12,
                    fontWeight: "400",
                    // fontFamily: "Poppins_400Regular",
                  }}
                >
                  {rev?.review}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

export default ListReviewsScreen;
