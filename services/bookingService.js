import axios from "axios";
export const BASE_URL = "https://api.vecul.co/";
export const API_VERSION = "v1";
const ext = "payment/webhook";

// export const listBankCodesApi = async (token) => {
//   //   {
//   //     "user_id": "ca7d37d6-e689-40a5-a7b2-8c74d4651e9d"
//   try {
//     return await axios.get(BASE_URL + API_VERSION + "/bank/list-bank-codes", {
//       headers: {
//         Authorization: token,
//       },
//     });
//   } catch (error) {
//     return error;
//   }
// };
export const notificationListApi = async (data, token) => {
  /**
 * {
    "status": "in_progress"
}
 */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/notification/query-notification",
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
export const bookingRentersListApi = async (data, token) => {
  /**
 * {
    "status": "in_progress"
}
 */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/booking/renter-list-booking",
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
export const bookingCarOwnersListApi = async (data, token) => {
  /**
 * {
    "status": "in_progress"
}
 */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/booking/host-list-booking",
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
export const bookingCarOwnersAccountApi = async (carId, token, amount = 0) => {
  const api =
    BASE_URL +
    API_VERSION +
    "/payment/account-details?car_id=" +
    carId +
    "&amount=" +
    amount;

  try {
    return await axios.get(
      api,
      {},
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
export const bookingVerifyPaymentApi = async (ref_id, token) => {
  const api =
    BASE_URL + API_VERSION + "/payment/verify-payment?ref_id=" + ref_id;

  try {
    return await axios.get(
      api,
      {},
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

export const startRentalConditionApi = async (data, token) => {
  const api = BASE_URL + API_VERSION + "/car/list-car-parts/";

  try {
    return await axios.get(api, data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const submitRentalConditionApi = async (data, token) => {
  const api = BASE_URL + API_VERSION + "/car/car-condition";

  try {
    return await axios.post(api, data, {
      header: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const getRentalConditionApi = async (data, token) => {
  const api = BASE_URL + API_VERSION + "/car/get-car-condition";

  try {
    return await axios.post(api, data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const extendRentalApi = async (data, token) => {
  const api = BASE_URL + API_VERSION + "/booking/extend-booking";
  try {
    return await axios.post(api, data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const extendCheckApi = async (data, token) => {
  const api =
    BASE_URL +
    API_VERSION +
    "/booking/conflict-check?car_id=" +
    data.car_id +
    "&start_date=" +
    data.start_date +
    "&end_date=" +
    data.end_date;

  try {
    return await axios.get(api, data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
