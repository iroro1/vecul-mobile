import * as Sharing from "expo-sharing";
import { Alert, Share } from "react-native";

const useShare = () => {
  const onShare = async (message, url = "", title = "") => {
    try {
      const result = await Share.share({
        url: "",
        message: `${title} \n\n${message} \n\n ${url}`,
        title: title,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          return result;
        } else {
          // shared
          return result;
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        return result;
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const expoShare = async (url) => {
    try {
      const result = await Sharing.shareAsync({
        url: url || "",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          return result;
        } else {
          // shared
          return result;
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        return result;
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return { onShare, expoShare };
};

export default useShare;
