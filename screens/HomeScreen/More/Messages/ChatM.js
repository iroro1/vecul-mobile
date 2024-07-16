import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import React from "react";
import { Pressable, Text, View } from "react-native";
import AvatarChat from "../../../../components/AvatarChat";
import { COLORS } from "../../../../utils/colors";

const ChatM = ({ data, nav }) => {
  console.log(data, 1);
  return (
    <Pressable
      onPress={() => {
        nav.navigate("ChatDetailM", { data });
      }}
    >
      <MotiView
        from={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          height: 68,
          marginTop: 11,
        }}
        style={{
          width: "100%",
          flexDirection: "row",
          gap: 6,
          overflow: "hidden",
        }}
        delay={500}
      >
        <AvatarChat
          showOnlineStatus={data?.isOnline}
          isOnline={data?.isOnline}
          imgUri={data?.avatar}
          size={60}
        />
        <View
          style={{
            width: "80%",
            padding: 8,
            position: "relative",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#3F3D56",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              {data?.name}
            </Text>
            <Text
              style={{
                color: data?.unreadNum > 0 ? COLORS.primary : "#3F3D56",
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              {data?.time}
            </Text>
          </View>
          <Text
            style={{
              color: "#667185",
              fontWeight: "400",
              fontSize: 13,
              marginTop: 5,
            }}
          >
            {data?.iSent
              ? "You: " + data?.text
              : data?.typing
              ? "is typing ..."
              : data?.text}
          </Text>
          {data?.unreadNum > 0 && (
            <View
              style={{
                backgroundColor: COLORS.primary,
                width: 30,
                height: 17,
                marginTop: 5,
                position: "absolute",
                right: 5,
                top: 25,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "500",
                  fontSize: 13,
                }}
              >
                {data?.unreadNum}
              </Text>
            </View>
          )}
          {data?.iSent > 0 && (
            <View
              style={{
                position: "absolute",
                right: 5,
                top: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <Ionicons name="checkmark" size={20} />
            </View>
          )}
        </View>
      </MotiView>
    </Pressable>
  );
};

export default ChatM;
