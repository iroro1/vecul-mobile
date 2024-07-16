import Toast, { BaseToast } from "react-native-toast-message";

const toastProps = {
  text1Style: {
    fontSize: 12,
  },
  text2Style: {
    fontSize: 12,
  },
  text2NumberOfLines: 0,
  style: {
    height: "auto",
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
};

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      {...toastProps}
      style={[
        toastProps.style,
        {
          borderLeftColor: "#69C779",
        },
      ]}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      {...toastProps}
      style={[
        toastProps.style,
        {
          borderLeftColor: "#FE6301",
        },
      ]}
    />
  ),
  warning: (props) => (
    <BaseToast
      {...props}
      {...toastProps}
      style={[
        toastProps.style,
        {
          borderLeftColor: "#FFC107",
        },
      ]}
    />
  ),
};
const useToast = () => {
  const toast = (
    type = "success",
    text1 = "",
    text2 = "",
    // eslint-disable-next-line prettier/prettier
    visibilityTime = 4000
  ) =>
    Toast.show({
      type,
      text1,
      text2,
      visibilityTime,
    });
  return {
    toast,
  };
};

export default useToast;
