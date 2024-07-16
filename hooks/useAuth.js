import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_AUTH_STATE } from "../store/appSlice";
import useLocalStorage from "./useLocalStorage";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const { getDataObject, clearStorage, storeDataObject } = useLocalStorage();
  const dispatch = useDispatch();

  useMemo(async () => {
    setLoading(true);
    try {
      const user1 = await getDataObject("authState");
      const user = user1?.userResponse || user1;
      console.log(user, 2);
      if (user?.id_token) {
        setIsAuth(true);
        setUserData(user);
        dispatch(SET_AUTH_STATE(user));
        return {
          isAuth: true,
          userData: user,
        };
      } else {
        setIsAuth(false);
        setUserData(null);
      }
    } catch (error) {}

    setLoading(false);
  }, [userData?.picture, userData?.given_name, userData?.family_name]);

  const logOutFn = () => {
    clearStorage("authState");
    setUserData(null);
    dispatch(SET_AUTH_STATE({}));
    setIsAuth(false);
    setter({});
  };
  const setter = async (data) => {
    try {
      await storeDataObject("authState", data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    isAuth,
    userData,
    setUserData,
    setterAuth: setter,
    logOutFn,
    loadingAuth: loading,
  };
};

export default useAuth;
