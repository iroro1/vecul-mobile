import axios from "axios";
export const BASE_URL = "https://api.vecul.co/";
export const API_VERSION = "v1";

export const likeCarApi = async (data, token) => {
  /**
       {
      car_id:"",
      like:boolean
    }
         */
  try {
    return await axios.post(BASE_URL + API_VERSION + "/car/like-car", data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const listFavoritesApi = async (data, token) => {
  /**
     {
  }
       */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/car/list-favourites",
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    return error;
  }
};
