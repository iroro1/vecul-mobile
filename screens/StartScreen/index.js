import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
  useFonts,
} from "@expo-google-fonts/poppins";
import { WEB_SOCKET_KEY } from "@env";

import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocation from "../../hooks/useLocation";
import {
  SET_CURRENT_LOCATION,
  SET_NOTI_UNREAD,
  authSelector,
} from "../../store/appSlice";
import usePush from "../../hooks/usePush";

const StartScreen = () => {
  const userStore = useSelector(authSelector);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const {
    registerForPushNotificationsAsync,
    sendPushNotification,
    NotificationsPush,
  } = usePush();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      NotificationsPush.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      NotificationsPush.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      NotificationsPush.removeNotificationSubscription(
        notificationListener.current
      );
      NotificationsPush.removeNotificationSubscription(
        responseListener.current
      );
    };
  }, []);

  // PUSH NOTIFICATION
  const ws = new WebSocket(`${WEB_SOCKET_KEY}?user_id=${userStore?.sub}`);
  ws.onopen = () => {
    // connection opened
    // ws.send("something"); // send a message
    // console.log("Open");
  };

  ws.onmessage = (e) => {
    // a message was received
    dispatch(SET_NOTI_UNREAD(true));
    sendPushNotification(userStore?.sub, e.data);
    // console.log(e.data, "Data");
  };

  ws.onerror = (e) => {
    // an error occurred
    console.log(e.message, "err", ws);
  };

  ws.onclose = (e) => {
    // connection closed
    // console.log(e.code, e.reason, "Close");
  };

  const [appIsReady, setAppIsReady] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const getLoc = async () => {
    dispatch(SET_CURRENT_LOCATION(location.location));
  };
  const nav = useNavigation();

  useEffect(() => {
    async function prepare() {
      try {
        await getLoc();
        // Pre-load fonts, make any API calls you need to do here
        await new Promise((resolve) => setTimeout(resolve, 4000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 4000);
  }, [appIsReady]);
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
  } else {
    return nav.reset({
      index: 0,
      routes: [{ name: "HomeScreen" }],
    });
  }
};

export default StartScreen;
