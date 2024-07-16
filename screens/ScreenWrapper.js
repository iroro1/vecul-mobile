import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import { AnimatePresence, MotiView } from "moti";
import ToastBoxVecul from "../components/ToastBoxVecul";
import DismissKeyboard from "../components/DismissKeyboard.js/index.js";

const ScreenWrapper = ({
  children,
  dismissKeyboard = true,
  noSafe = false,
}) => {
  return (
    <>
      {Platform.OS === "android" && <StatusBar />}
      <ToastBoxVecul />
      {noSafe ? (
        <View
          style={{
            flex: 1,
            minHeight: "100%",
            position: "relative",
            width: "100%",
            backgroundColor: "#F9FAFB",
          }}
        >
          {dismissKeyboard ? (
            <DismissKeyboard>
              <MotiView
                from={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  backgroundColor: "#F9FAFB",
                  flex: 1,
                  height: "100%",
                  position: "relative",
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  delay: 200,
                }}
              >
                {children}
              </MotiView>
            </DismissKeyboard>
          ) : (
            <MotiView
              from={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                backgroundColor: "#F9FAFB",
                flex: 1,
                height: "100%",
                position: "relative",
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                delay: 200,
              }}
            >
              {children}
            </MotiView>
          )}
        </View>
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            minHeight: "100%",
            position: "relative",
            width: "100%",
            backgroundColor: "#F9FAFB",
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            paddingHorizontal: "3%",
          }}
        >
          {dismissKeyboard ? (
            <DismissKeyboard>
              <MotiView
                from={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  backgroundColor: "#F9FAFB",
                  flex: 1,
                  height: "100%",
                  position: "relative",
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  delay: 200,
                }}
              >
                {children}
              </MotiView>
            </DismissKeyboard>
          ) : (
            <MotiView
              from={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                backgroundColor: "#F9FAFB",
                flex: 1,
                height: "100%",
                position: "relative",
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                delay: 200,
              }}
            >
              {children}
            </MotiView>
          )}
        </SafeAreaView>
      )}
    </>
  );
};

export default ScreenWrapper;
