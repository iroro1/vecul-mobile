import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { refreshApi } from "../services/authService";
import { SET_AUTH_STATE } from "../store/appSlice";
import useAuth from "./useAuth";
import useLocalStorage from "./useLocalStorage";
import { jwtDecode } from "jwt-decode";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const { userData, setUserData } = useAuth();
  const { storeDataObject, getDataObject } = useLocalStorage();

  const refreshFn = async () => {
    const d = await getDataObject("authState");
    const exp = await getDataObject("expiredToken");
    try {
      const res = await refreshApi({
        user_id: d?.userResponse?.sub || d?.sub,
        refresh_token: exp?.origin?.refresh_token,
      });
      if (res?.status === 200) {
        const objMain = {
          userResponse: {
            ...jwtDecode(res?.data?.data?.id_token),
            ...res?.data?.data,
          },
        };
        setUserData(objMain.userResponse);
        await storeDataObject("expiredToken", {
          origin: {
            refresh_token: exp?.origin?.refresh_token,

            ...res?.data?.data,
          },
        });
        await storeDataObject("authState", objMain);
        dispatch(SET_AUTH_STATE(objMain?.userResponse));
        return objMain?.userResponse;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    callRefresh: refreshFn,
  };
};

export default useRefreshToken;
