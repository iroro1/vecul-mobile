import { View, Text } from "react-native";
import React, { useState } from "react";
import { BASE_URL } from "../services";
import axios from "axios";
import { useSelector } from "react-redux";
import { authSelector } from "../store/appSlice";
export const API_VERSION = "v1";

const useApi = () => {
  const [loading, setLoading] = useState();
  const [data, setData] = useState(null);
  const token = useSelector(authSelector)?.id_token;

  const callApi = async (payload, endpoint, verb) => {
    // endpoint "/auth/refresh-token"
    // verb -> get,post,put,delete,patch

    setLoading(true);
    try {
      if (verb === "post") {
        const res = await axios.post(
          BASE_URL + API_VERSION + endpoint,
          payload,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setData(res);
      }
      if (verb === "get") {
        const res = await axios.get(
          BASE_URL + API_VERSION + endpoint,
          payload,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setData(res);
      }
      if (verb === "put") {
        const res = await axios.put(
          BASE_URL + API_VERSION + endpoint,
          payload,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setData(res);
      }
      if (verb === "delete") {
        const res = await axios.delete(
          BASE_URL + API_VERSION + endpoint,
          payload,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setData(res);
      }
      if (verb === "patch") {
        const res = await axios.patch(
          BASE_URL + API_VERSION + endpoint,
          payload,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setData(res);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return {
    loading,
    response: data,
    callApi,
  };
};

export default useApi;
