import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocalStorage = () => {
  const storeDataString = async (value, key) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const storeDataObject = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const getDataString = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  const getDataObject = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  const clearStorage = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  return {
    storeDataString,
    storeDataObject,
    getDataString,
    getDataObject,
    clearStorage,
  };
};

export default useLocalStorage;
