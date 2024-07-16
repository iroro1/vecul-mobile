import { GOOGL_MAPS_API_KEY } from "@env";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const AutocompleteInput = ({
  onPress,
  textInputContainer = {
    borderColor: "#D0D5DD",
    borderWidth: 1,
  },
  debounce = 4000,
  fetchDetails = true,
  enablePoweredByContainer = false,
  minLength = 2,
  styles = {
    container: {
      flex: 1,
    },
    textInputContainer,
  },
  listViewDisplayed = false,
  textInputProps = {
    placeholderTextColor: "#999",
    returnKeyType: "search",
  },
  placeholder = " Address, city, hotels or other places",
}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        onPress({ data, details });
      }}
      textInputProps={textInputProps}
      listViewDisplayed={listViewDisplayed}
      styles={styles}
      minLength={minLength}
      enablePoweredByContainer={enablePoweredByContainer}
      fetchDetails={fetchDetails}
      debounce={debounce}
      query={{
        key: GOOGL_MAPS_API_KEY,
        language: "en",
      }}
    />
  );
};

export default AutocompleteInput;
