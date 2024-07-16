import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "expo-modules-core";
import { useState } from "react";
import { useDispatch } from "react-redux";

// const checkFileSize = async (fileURI) => {
//   const fileSizeInBytes = await FileSystem.getInfoAsync(fileURI);
//   return fileSizeInBytes;
// };
const useCamera = () => {
  const [pickedImagePath, setPickedImagePath] = useState(null);
  const dispatch = useDispatch();
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    if (Platform.OS === "android") {
      // Alert.alert(
      //   "Select photo or video",
      //   "Do you want to take a photo or video?",
      //   [
      //     {
      //       text: "Close",
      //       onPress: () => null,
      //     },
      //     {
      //       text: "Photo",
      //       onPress: async () => {
      //         const result = await ImagePicker.launchCameraAsync({
      //           base64: true,
      //           mediaTypes: "Images",
      //           aspect: [4, 3],
      //           quality: 1,
      //           allowsEditing: true,
      //         });
      //         if (!result.canceled) {
      //           dispatch(SET_CAM_RESULT(result.assets[0]));
      //           return result.assets[0];
      //         }
      //       },
      //     },
      //     {
      //       text: "Video",
      //       onPress: async () => {
      //         const result = await ImagePicker.launchCameraAsync({
      //           base64: true,
      //           mediaTypes: "Videos",
      //           aspect: [4, 3],
      //           quality: 1,
      //           allowsEditing: true,
      //           duratiinLimit: 60,
      //         });

      //         if (!result.canceled) {
      //           console.log(result, "999");
      //           setPickedImagePath(result.assets[0]);
      //           dispatch(SET_CAM_RESULT(result.assets[0]));
      //           return { file: result.assets[0] };
      //         }
      //       },
      //     },
      //   ],
      //   // eslint-disable-next-line prettier/prettier
      //   { cancelable: true }
      // );
      const result = await ImagePicker.launchCameraAsync({
        base64: true,
        mediaTypes: "Images",
        aspect: [4, 3],
        quality: 1,
        allowsEditing: true,
      });
      if (!result.canceled) {
        setPickedImagePath(result.assets[0]);
        return result.assets[0];
      }
    } else {
      const result = await ImagePicker.launchCameraAsync({
        base64: true,
        mediaTypes: "All",
        aspect: [4, 3],
        quality: 1,
        allowsEditing: true,
        duratiinLimit: 60,
      });

      if (!result.canceled) {
        setPickedImagePath(result.assets[0]);
        return { file: result.assets[0] };
      }
    }
  };
  const pickImage = async (chosenImg = () => {}, type = "All") => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions[type],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    const resultNxt = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions[type],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const fsRead = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: "base64",
      });
      const base64Vid = `data:video/mp4;base64,${fsRead}`;
      const base64Img = `data:image/jpeg;base64,${fsRead}`;
      chosenImg({
        url: "",
        vid: base64Vid,
        img: base64Img,
        file: result.assets[0],
        mainFile: resultNxt,
      });
      setPickedImagePath({
        url: "",
        vid: base64Vid,
        img: base64Img,
        file: result.assets[0],
        mainFile: resultNxt,
      });
      return {
        url: "",
        vid: base64Img,
        img: base64Img,
        file: result.assets[0],
        mainFile: resultNxt,
      };
    } else {
      return null;
    }
  };
  return { camera: openCamera, result: pickedImagePath, pickImage };
};

export default useCamera;
