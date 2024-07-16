import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { AnimatePresence, MotiView } from "moti";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import Avatar from "../../../components/Avatar";

const NotificationDetail = (props) => {
  const data = props?.route?.params?.data;
  console.log(data, 22);
  return (
    <AnimatePresence>
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
        }}
        transition={{
          delay: 200,
        }}
      >
        <SafeAreaView style={{ height: "100%", backgroundColor: "#fff" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: "3%",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <BackButton type={2} onPress={() => props.navigation.goBack()} />
              <Text
                style={{
                  color: "#101928",
                  fontWeight: "600",
                  fontSize: 18,
                }}
              >
                Notification detail
              </Text>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: "3%",
              marginTop: 30,
            }}
          >
            <View
              style={{
                marginBottom: 30,
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Avatar size={80} />
              <Text
                style={{
                  color: "#101928",
                  fontWeight: "600",
                  fontSize: 18,
                }}
              >
                {data?.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  color: "#667185",
                }}
              >
                Rented by
              </Text>
              <Text
                style={{
                  color: "#101928",
                  fontWeight: "600",
                }}
              >
                {data?.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  color: "#667185",
                }}
              >
                Car
              </Text>
              <Text
                style={{
                  color: "#101928",
                  fontWeight: "600",
                }}
              >
                {data?.car}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  color: "#667185",
                }}
              >
                Trip Duration
              </Text>
              <Text
                style={{
                  color: "#101928",
                  fontWeight: "600",
                }}
              >
                {data?.duration}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  color: "#667185",
                }}
              >
                Amount paid
              </Text>
              <Text
                style={{
                  color: "#101928",
                  fontWeight: "600",
                }}
              >
                {data?.amount}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  color: "#667185",
                }}
              >
                Start date
              </Text>
              <Text
                style={{
                  color: "#101928",
                  fontWeight: "600",
                }}
              >
                {data?.startDate}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  color: "#667185",
                }}
              >
                End date
              </Text>
              <Text
                style={{
                  color: "#101928",
                  fontWeight: "600",
                }}
              >
                {data?.endDate}
              </Text>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 10,
              flexDirection: "row",
              marginHorizontal: "3%",
              justifyContent: "space-between",
            }}
          >
            <CustomButton
              style={{
                width: "45%",
                height: 44,
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#D42620",
              }}
              textStyles={{
                color: "#D42620",
              }}
              label="Reject booking"
              onPress={() => props.navigation.goBack()}
            />
            <CustomButton
              style={{
                width: "45%",
                height: 44,
              }}
              label="Accept booking"
              onPress={() => props.navigation.goBack()}
            />
          </View>
        </SafeAreaView>
      </MotiView>
    </AnimatePresence>
  );
};

export default NotificationDetail;
