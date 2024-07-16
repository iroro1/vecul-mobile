import { createSlice } from "@reduxjs/toolkit";
import { setFavoriteCarFunction } from "./storeFunctions";

const initialState = {
  notificationsUnread: 1,
  carListing: [],
  carsRented: [],
  myCars: [],
  userData: {},
  setUpData: {},
  searchData: {},
  notificationList: [
    {
      id: 1,
      topic: "Your rental for BMW RS - 2019 is ending tomorrow.",
      time: "Just now",
      read: false,
      section: "today",
      type: "rent",
    },
    {
      id: 2,
      topic: "You have 10 new messages.",
      time: "15 mins ago",
      read: false,
      section: "today",
      type: "message",
    },
    {
      id: 3,
      topic: "You have 10 new messages.",
      time: "15 mins ago",
      read: true,
      section: "today",
      type: "message",
    },
    {
      id: 4,
      topic: "Elan Misk has requested to rent your BMW RS - 2019.",
      time: "1 day ago",
      read: false,
      data: {
        id: 1,
        name: "Loveth Mark",
        car: "BMW RS - 2019",
        duration: "5 days",
        amount: "#13,300",
        startDate: "12 February, 2024 at 10:30 PM",
        endDate: "15 February, 2024 at 10:30 PM",
      },
      section: "today",
      type: "rent",
    },
    {
      id: 5,
      topic: "You have 8 new messages",
      time: "2 days ago",
      read: false,
      data: {
        id: 1,
        name: "Loveth Mark",
        car: "BMW RS - 2019",
        duration: "5 days",
        amount: "#13,300",
        startDate: "12 February, 2024 at 10:30 PM",
        endDate: "15 February, 2024 at 10:30 PM",
      },
      section: "earlier",
      type: "message",
    },
    {
      id: 6,
      topic: "Elan Misk has requested to rent your BMW RS - 2019.",
      time: "1 month ago",
      read: false,
      data: {
        id: 1,
        name: "Loveth Mark",
        car: "BMW RS - 2019",
        duration: "5 days",
        amount: "#13,300",
        startDate: "12 February, 2024 at 10:30 PM",
        endDate: "15 February, 2024 at 10:30 PM",
      },
      section: "earlier",
      type: "rent",
    },
  ],
  newCarData: {
    user_id: "",
    car_brand: "",
    car_model: "",
    car_year: "",
    vin: "",
    car_registration_due_date: "",
    number_of_seats: 0,
    number_of_doors: 0,
    number_plate: "",
    engine_type: "",
    transmission: "",
    car_pictures: [],
    vehicle_video: "",
    price: "",
    previous_price: "",
    car_description: "",
    car_features: {
      airbags: 0,
      air_condition: false,
      aux_input: false,
      bluetooth: false,
      apple_carplay: false,
      android_auto: false,
      usb_charger: false,
    },
    car_address: {
      latitude: "",
      longitude: "",
    },
    car_availabilty: false,
    comes_with_driver: false,
    owners_condition: {
      condition_one: "",
      condition_two: "",
    },
    name_of_insurer: "",
    car_insurance_documents: "",
    insurance_payment_receipt: "",
  },
  filterData: {},
  dateRangeFilter: {},
  currentLocation: {
    latitude: 6.5244,
    longitude: 3.3792,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  path: "CarListings",
  notiUnread: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    SET_FAVORITE_CAR_LIST: (state, action) => {
      state.carListing = setFavoriteCarFunction(
        state.carListing,
        action.payload
      );
    },
    SET_AUTH_STATE: (state, action) => {
      state.authState = action.payload;
    },
    SET_CARS_RENTED: (state, action) => {
      state.carsRented += action.payload;
    },
    SET_MY_CARS: (state, action) => {
      state.myCars = action.payload;
    },
    SET_CARS_LIST: (state, action) => {
      state.carListing = action.payload;
    },

    SETUP_STARTUP: (state, action) => {
      state.setUpData = action.payload;
    },
    SET_SEARCH_DATA: (state, action) => {
      state.searchData = action.payload;
    },
    ADD_CAR_DATA_CREATE: (state, action) => {
      state.newCarData = action.payload;
    },
    SET_FILTER: (state, action) => {
      state.filterData = action.payload;
    },
    SET_DATE_FILTER: (state, action) => {
      state.dateRangeFilter = action.payload;
    },
    SET_CURRENT_LOCATION: (state, action) => {
      state.currentLocation = action.payload;
    },
    SET_PATH: (state, action) => {
      state.notiUnread = action.payload;
    },
    SET_NOTI_UNREAD: (state, action) => {
      state.path = action.payload;
    },
    SET_PROFILE_IMG: (state, action) => {
      state.authState = { ...state?.authState, picture: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  SET_AUTH_STATE,
  SET_FAVORITE_CAR_LIST,
  SET_CARS_LIST,
  SETUP_STARTUP,
  SET_CARS_LIST_BY_BRAND,
  SET_CARS_RENTED,
  SET_MY_CARS,
  ADD_CAR_DATA_CREATE,
  SET_FILTER,
  SET_SEARCH_DATA,
  SET_CURRENT_LOCATION,
  SET_DATE_FILTER,
  SET_PATH,
  SET_PROFILE_IMG,
  SET_NOTI_UNREAD,
} = appSlice.actions;

// Selectors
export const authSelector = (state) => state?.app?.authState;
export const notificationSelector = (state) => state?.app?.notificationList;
export const notiUndreadSelector = (state) => state?.app?.notiUnread;
export const carsSelector = (state) => state?.app?.carListing;
export const newCarSelector = (state) => state?.app?.newCarData;
export const filterSelector = (state) => state?.app?.filterData;
export const dateRangeSelector = (state) => state?.app?.dateRangeFilter;
export const currentLocationSelector = (state) => state?.app?.currentLocation;
export const pathSelector = (state) => state?.app?.path;

export default appSlice.reducer;
