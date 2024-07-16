import { AnimatePresence, MotiView } from "moti";
import React, { useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import NotificationLogic from "./NotificationLogic";

const Notifications = (props) => {
  return (
    <AnimatePresence>
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
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: StatusBar.currentHeight,
          }}
        >
          <NotificationLogic />
        </SafeAreaView>
      </MotiView>
    </AnimatePresence>
  );
};

export default Notifications;
