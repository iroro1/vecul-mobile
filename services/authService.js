import axios from "axios";
export const BASE_URL = "https://api.vecul.co/";
export const API_VERSION = "v1";

export const signUpApi = async (data) => {
  /**
     * {
    "name": "Olaniyi Ajayi",
    "email": "ajayiolaniyi+vecul@gmail.com",
    "password": "Password123!!!"
}
     */
  try {
    return await axios.post(BASE_URL + API_VERSION + "/account/signup", data);
  } catch (error) {
    return error;
  }
};
export const refreshApi = async (data, token) => {
  /**
     * {
    "user_id": "",
    refresh_token:""
}
     */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/auth/refresh-token",
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
export const resendCodeApi = async (data) => {
  /**
     * {
    "email": "ajayiolaniyi+vecul@gmail.com",
}
     */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/account/resend-code",
      data
    );
  } catch (error) {
    return error;
  }
};
export const forgotPasswordApi = async (data) => {
  /**
     * {
    "email": "ajayiolaniyi+vecul@gmail.com",
}
     */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/core/forgot-password",
      data
    );
  } catch (error) {
    return error;
  }
};
export const confirmAuthApi = async (data) => {
  /**
     *
     * {
    "code": "990185",
    "email": "ajayiolaniyi+vecul@gmail.com"
}
     */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/account/confirm-signup",
      data
    );
  } catch (error) {
    return error;
  }
};
export const loginApi = async (data) => {
  /**
     * 
     * {
    "email": "ajayiolaniyi+vecul@gmail.com",
    "password": "Password123!!!"
}
     */
  try {
    return await axios.post(BASE_URL + API_VERSION + "/auth/login", data);
  } catch (error) {
    return error;
  }
};
export const confirmForgotPasswordApi = async (data) => {
  /**
     * 
     *{
    "email": "ajayiolaniyi+vecul@gmail.com",
    "code": "286355",
    "password": "Password123!!!"
}
     */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/core/confirm-forgot-password",
      data
    );
  } catch (error) {
    return error;
  }
};
