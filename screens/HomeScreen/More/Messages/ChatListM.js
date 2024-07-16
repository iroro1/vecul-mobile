import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import BackButton from "../../../../components/BackButton";
import ChatM from "./ChatM";

const ChatListM = (props) => {
  const { navigation } = props;
  const carsRented = useSelector((state) => state?.app?.carsRented);
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Chelsea Hagon",
      isOnline: true,
      unreadNum: 10,
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "12.30",
      date: "3/2/24",
      text: "I'd definitely shoot any opportunities ",
    },
    {
      id: 2,
      name: "Chelsea Hagon",
      isOnline: false,
      unreadNum: 0,
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "12.30",
      date: "3/2/24",
      text: "I'd definitely shoot any opportunities ",
    },
    {
      id: 3,
      name: "Chelsea Hagon",
      isOnline: false,
      unreadNum: 0,
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "12.30",
      date: "3/2/24",
      text: "I'd definitely shoot any opportunities ",
      iSent: true,
    },
    {
      id: 4,
      name: "Chelsea Hagon",
      isOnline: false,
      unreadNum: 0,
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      time: "12.30",
      date: "3/2/24",
      text: "I'd definitely shoot any opportunities ",
      iSent: false,
      typing: true,
      rent: {
        carName: "BMW M8",
        startDate: "12 February,2024",
        endDate: "15 February,2024",
        amountCharged: "15,300",
        carId: "11111",
      },
    },
  ]);

  const [active, setActive] = useState(false);
  console.log(active);
  return (
    <AnimatePresence>
      <SafeAreaView
        style={{
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
          flex: 1,
          minHeight: "100%",
          position: "relative",
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1, backgroundColor: "#fff", flex: 1 }}
          exit={{
            opacity: 0,
          }}
          transition={{
            delay: 200,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: "3%",
              alignItems: "center",
            }}
          >
            <BackButton type={2} onPress={() => navigation.goBack()} />
            <Text
              style={{
                paddingHorizontal: "3%",
                color: "#383838",
                fontSize: 16,
                fontWeight: "800",
              }}
            >
              Messages
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: carsRented.length > 0 ? "flex-start" : "center",
              alignItems: carsRented.length > 0 ? "flex-start" : "center",
              paddingHorizontal: "3%",
            }}
          >
            {chats.length === 0 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../../assets/images/emptyInbox.png")}
                />
                <Text
                  style={{
                    fontWeight: "700",
                  }}
                >
                  No messages yet
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    color: "#98A2B3",
                    textAlign: "center",
                    width: 306,
                  }}
                >
                  Messages between you and the car renter will appear here when
                  a car is booked.
                </Text>
              </View>
            )}
            {chats.length > 0 && (
              <FlatList
                style={{
                  marginTop: 20,
                }}
                data={chats}
                keyExtractor={(item) => item?.id}
                renderItem={({ item }) => (
                  <View
                    style={{
                      borderBottomColor: "#F0F2F5",
                      borderBottomWidth: 1,
                      paddingBottom: 6,
                    }}
                  >
                    <ChatM nav={navigation} data={item} />
                  </View>
                )}
              />
            )}
          </View>
        </MotiView>
      </SafeAreaView>
    </AnimatePresence>
  );
};

export default ChatListM;
