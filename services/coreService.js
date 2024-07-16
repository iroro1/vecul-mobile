import axios from "axios";
export const BASE_URL = "https://api.vecul.co/";
export const API_VERSION = "v1";

export const imageUploadApi = async (data, token) => {
  /**
     * 
     * {
    "user_id": "ca7d37d6-e689-40a5-a7b2-8c74d4651e9d",
    "contents": [
      iWDEcK5mQdnHY49N5XU5TDy6V9t79h/X9nQukIDODk5o+23XSUln9pxHZN45dh2jSKMhFzb3d+yRpUTCiJZraRYfVfteOM9apSDPH0r8Uqxjf6/ZbF/hj6+2hr73zltiaGh6rgsAAAAAAADoVALgEfTGcDylfzD+ZPbaeGLf5uif0mP8tse8XRbFoU9+Rizae/+486ZrY9VDDwQAAAAAAADQGQTAJR7VNxh/NmtdPHPGpugLwW+9bA29"
  ]
}
     */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/core/image-upload",
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
export const createCarApi = async (data, token) => {
  /**
   {
  "user_id": "ca7d37d6-e689-40a5-a7b2-8c74d4651e9d",
  "car_brand": "toyota",
  "car_model": "Camry",
  "car_year": "2022",
  "vin": "1HGCM82633A123456",
  "car_registration_due_date": "2024-04-30",
  "number_of_seats": 5,
  "number_of_doors": 4,
  "number_plate": "ABC123",
  "engine_type": "petrol",
  "transmission": "automatic",
  "car_pictures": ["http://example.com/car1.jpg", "http://example.com/car2.jpg"],
  "price": "$25,000",
  "previous_price": "$28,000",
  "car_description": "This is a well-maintained Toyota Camry with low mileage.",
  "car_features": {
    "air_condition": true,
    "aux_input": true,
    "bluetooth": true,
    "apple_carplay": true,
    "android_auto": true,
    "usb_charger": true
  },
  "car_address": {
    "address": "123 Main St",
    "city": "Anytown",
    "postal_code": "12345",
    "state": "CA"
  },
  "car_availabilty": true
}

     */
  try {
    return await axios.post(BASE_URL + API_VERSION + "/car/create-car", data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const calculateBookingsApi = async (data, token) => {
  /**
   {
  car_id:"",
  start_date:"2024-05-26",
  end_date:"2024-05-26",
}
     */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/booking/overview",
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
export const createStoreApi = async (data, token) => {
  /**
     * 
{
    "business_name": "Ephraim Vecul Rental",
    "phone_number": "08023420872",
    "description": "Fast Cars Rental offers a diverse fleet of vehicles, ranging from economy cars to luxury SUVs. Our rentals are available for short-term and long-term leases with flexible pricing options. We pride ourselves on our exceptional customer service and transparent rental terms. Whether you're looking for a quick weekend getaway or a month-long road trip, we have the perfect car for you...",
    "bvn": "22157559912",
    "dob": "1973/10/31",
    "pin": "1973",
    "logo": "https://dzrsteit2h2vm.cloudfront.net/vecul/testing/images/485b6dc5-0075-4b2a-9fbe-b13ff7dbf54f-1718051526613.jpeg",
    "host_type": "individual"
}
     */
  try {
    return await axios.post(BASE_URL + API_VERSION + "/host/create", data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const getStoreApi = async (token) => {
  /**
     * 
{
    "rental_id": "rental_ca7d37d6-e689-40a5-a7b2-8c74d4651e9d"
}
     */
  try {
    return await axios.get(BASE_URL + API_VERSION + "/host/get", {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const listCarsApi = async (data, tk) => {
  try {
    return await axios.post(BASE_URL + API_VERSION + "/car/list-cars", data, {
      headers: {
        Authorization: tk,
      },
    });
  } catch (error) {
    return error;
  }
};
export const listMyCarsApi = async (data, token) => {
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

export const listCarsByBrandApi = async (data, token) => {
  /**
   * {
    "car_brand": "acura"
}
   */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/car/list-cars-by-brand",
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
export const getCarByIdApi = async (data, token) => {
  /**
   * {
    "car_id": "car_87130979-8d1b-4b12-b925-e4cb6e317c67"
}
   */
  try {
    return await axios.post(BASE_URL + API_VERSION + "/car/get-car", data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const deleteCarByIdApi = async (data, token) => {
  /**
   * {
    "car_id": "car_87130979-8d1b-4b12-b925-e4cb6e317c67"
}
   */
  try {
    return await axios.post(BASE_URL + API_VERSION + "/car/delete-car", data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const createBookingApi = async (data, token) => {
  /**
     * 
 {
    "car_id": "ca7d37d6-e689-40a5-a7b2-8c74d4651e9d",
    "start_date": "2024/06/02",
    "end_date": "2024/06/02",
    "overview": {
      "price_per_day":"",
      trip_duration:"",
      insurance:"",
      cummulative_insurance:"",
      service_charge:"",
      total:""
    }
}
     */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/booking/create-booking",
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
export const changePasswordApi = async (data, token) => {
  /**
     * 
 {
    "previous_password": "",,
    "proposed_password":"",
    "access_token":""

}
     */
  try {
    return await axios.post(
      BASE_URL + API_VERSION + "/core/change-password",
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
export const updatePersonalInfoApi = async (data, token) => {
  /**
     * 
{
    "first_name": "Olaniyivecul4"
    “last_name": "Olaniyivecul4"
}

     */
  try {
    return await axios.post(BASE_URL + API_VERSION + "/user/update", data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const getUserApi = async (token) => {
  /**
   */
  try {
    return await axios.get(BASE_URL + API_VERSION + "/user/get", {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
export const deleteAccountApi = async (data, token) => {
  /**
   * {
    "disable": true
}
   */
  try {
    return await axios.post(BASE_URL + API_VERSION + "/user/disable", data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    return error;
  }
};
