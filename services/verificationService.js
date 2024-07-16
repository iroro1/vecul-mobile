import axios from "axios";
export const BASE_URL = "https://api.vecul.co/";
export const API_VERSION = "v1";

export const licenseStatusApi = async (data, token) => {
  /**
       {
      user_id:"",
    }
         */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/verification/check-kyc",
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
export const verifyDriversLicenseApi = async (data, token) => {
  /**
     {
    user_id:"",
   id_number:""GGE60638AA11,
   dob:"2000-05-28"
  }
       */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/verification/drivers-license",
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
export const verifyNinApi = async (data, token) => {
  /**
{
    "user_id": "c9761d26-9e01-4a61-b78b-8c221ab3dbe0",
    "id_number": "43407170452"
}
       */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/verification/nin-slip",
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
