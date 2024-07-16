import * as Location from "expo-location";
import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { storeDataObject, getDataObject } = useLocalStorage();
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = location;
  }

  text = location;

  const setLocationHistory = async (obj) => {
    const loc = await getDataObject("locationHistory");

    const state = loc ? [obj, ...loc] : [obj];
    if (state?.length > 0) {
      const arr = [];
      state.splice(0, 4).map((s) => {
        if (arr.find((e) => e.name === s.name)) {
        } else {
          arr.push(s);
        }
      });
      await storeDataObject("locationHistory", arr);
    } else {
      await storeDataObject("locationHistory", state);
    }
  };
  const getLocationHistory = async () => {
    const res = await getDataObject("locationHistory");
    return res.splice(0, 4);
  };

  return { location: text, setLocationHistory, getLocationHistory };
};

export default useLocation;
