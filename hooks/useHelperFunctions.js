import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_FAVORITE_CAR_LIST } from "../store/appSlice";

const useHelperFunctions = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.app);
  const setFavorite = (fav) => dispatch(SET_FAVORITE_CAR_LIST(fav));
  const getFavoritesList = () => {
    return store.carListing.filter((itm) => {
      if (itm.isLiked) {
        return itm;
      }
    });
  };
  const notificationsUnread = store?.notificationsUnread;
  return {
    setFavorite,
    getFavoritesList,
    notificationsUnread,
  };
};

export default useHelperFunctions;
