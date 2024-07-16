import axios from "axios";
export const BASE_URL = "https://api.vecul.co/";
export const API_VERSION = "v1";

export const listReviewApi = async (data, token) => {
  /**
       {
      car_id:"",
    }
         */
  try {
    return await axios.post(BASE_URL + API_VERSION + "/car/list-review", data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};

export const createReviewApi = async (data, token) => {
  /**
    {
      car_id:"",
      review:"",
      rate:""
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
