import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import tw from "twrnc";
import { notiUndreadSelector } from "../../../store/appSlice";

const NotificationBell = () => {
  const navigation = useNavigation();
  const noti = useSelector(notiUndreadSelector);
  return (
    <TouchableOpacity
      style={[
        tw`w-[36px] h-[36px] rounded-full bg-[#E4E7EC] flex items-center justify-center absolute right-[3%] android:top-[0px] ios:top-[0px]`,
        { zIndex: 100 },
      ]}
      onPress={() => navigation.navigate("Notifications")}
    >
      <View style={{ position: "relative" }}>
        {noti && (
          <View
            style={{
              backgroundColor: "#D42620",
              height: 8,
              width: 8,
              borderRadius: 4,
              position: "absolute",
              right: 2,
              top: 4,
              zIndex: 10,
            }}
          />
        )}
        <Ionicons size={20} name="notifications-outline" />
      </View>
    </TouchableOpacity>
  );
};

export default NotificationBell;
