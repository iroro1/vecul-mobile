import axios from "axios";
export const BASE_URL = "https://api.vecul.co/";
export const API_VERSION = "v1";
const ext = "payment/webhook";

export const checkBankApi = async (token) => {
  //   {
  //     "user_id": "ca7d37d6-e689-40a5-a7b2-8c74d4651e9d"
  try {
    return await axios.get(BASE_URL + API_VERSION + "/bank/get-bank", {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const listBankCodesApi = async (token) => {
  //   {
  //     "user_id": "ca7d37d6-e689-40a5-a7b2-8c74d4651e9d"
  try {
    return await axios.get(BASE_URL + API_VERSION + "/bank/list-bank-codes", {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const loadWalletApi = async (data, token) => {
  const { last_evaluated_key } = data;
  const api = last_evaluated_key
    ? BASE_URL +
      API_VERSION +
      "/transaction/list?last_evaluated_key=" +
      last_evaluated_key
    : BASE_URL + API_VERSION + "/transaction/list";

  try {
    return await axios.get(api, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const withdrawalApi = async (amount, pin, token) => {
  const api =
    BASE_URL +
    API_VERSION +
    "/payment/withdraw?amount=" +
    amount +
    "&pin=" +
    pin;

  try {
    return await axios.get(api, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const loadTransactionsApi = async (data, token) => {
  //   {
  //     "user_id": "ca7d37d6-e689-40a5-a7b2-8c74d4651e9d"
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/car/list-my-cars",
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
export const verifyBankAccountApi = async (data, token) => {
  /**
 * {
    "account_number": "0162434616",
    "bank_code": "058"
}
 */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/bank/verify-account-number",
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
export const addBankAccountApi = async (data, token) => {
  /**
 *{
    "bank_name": "Guaranty Trust Bank",
    "account_number": "0162434216",
    "account_name": "AJAYI OLANIYI EZEKIEL"
}
 */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/bank/create-bank",
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
export const updateBankAccountApi = async (data, token) => {
  /**
 *{
    "account_number": "0162434217"
}
 */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/bank/update-bank",
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
// export const likeCarApi = async (data, token) => {
//   /**
//        {
//       car_id:"",
//       like:boolean
//     }
//          */
//   try {
//     return await axios.post(BASE_URL + API_VERSION + "/car/like-car", data, {
//       headers: {
//         Authorization: token,
//       },
//     });
//   } catch (error) {
//     return error;
//   }
// };
// export const listFavoritesApi = async (data, token) => {
//   /**
//      {
//   }
//        */
//   try {
//     return await axios.post(
//       BASE_URL + API_VERSION + "/car/list-favourites",
//       data,
//       {
//         headers: {
//           Authorization: token,
//         },
//       }
//     );
//   } catch (error) {
//     return error;
//   }
// };
