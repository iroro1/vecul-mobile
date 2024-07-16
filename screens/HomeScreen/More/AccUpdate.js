import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Image, Modal, Platform, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import DropDownBank from "../../../components/DropDownBank";
import InputField from "../../../components/InputField";
import VeculAppLoader from "../../../components/VeculAppLoader";
import useRefreshToken from "../../../hooks/useRefreshToken";
import useToast from "../../../hooks/useToast";
import {
  addBankAccountApi,
  checkBankApi,
  listBankCodesApi,
  updateBankAccountApi,
  verifyBankAccountApi,
} from "../../../services/paymentService";
import { authSelector } from "../../../store/appSlice";
import { delayFn } from "../../../utils";
import { COLORS } from "../../../utils/colors";
import ScreenWrapper from "../../ScreenWrapper";

const AccUpdate = (props) => {
  const { navigation } = props;
  const [load, setLoad] = useState(true);
  const [banksList, setBanksList] = useState([]);
  const userStore = useSelector(authSelector);
  const [accNum, setAcNum] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const { callRefresh } = useRefreshToken();
  const [data, setData] = useState({
    bank_name: "",
    account_number: "",
    account_name: "",
  });

  const [loadV, setLoadV] = useState(false);
  const disableFn = () => {
    if (
      data?.accountHolder === "" ||
      data?.accountNumber === "" ||
      data?.bankName === ""
    )
      return true;
    return false;
  };
  const { toast } = useToast();
  const addBankAccount = async () => {
    setLoad(true);
    const obj = {
      bank_name: data?.bank_name,
      account_number: accNum,
      account_name: data?.account_name,
      bank_code: data?.bank_code,
    };
    try {
      const res = await addBankAccountApi(obj, userStore?.id_token);
      if (res?.status === 200) {
        toast("success", "Bank account added sucessfully");
        delayFn(() => {
          navigation.goBack();
        }, 3000);
      } else {
        toast(
          "error",
          "Bank account could not be added ",
          "Please check your details and try again"
        );
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  const updateBankAccount = async () => {
    setLoad(true);
    const obj = {
      bank_name: data?.bank_name,
      account_number: accNum,
      account_name: data?.account_name,
      bank_code: data?.bank_code,
    };
    try {
      const res = await updateBankAccountApi(obj, userStore?.id_token);
      console.log(res, "88", obj);

      if (res?.status === 200) {
        toast("success", "Bank account added sucessfully");
        delayFn(() => {
          navigation.goBack();
        }, 3000);
      } else {
        toast(
          "error",
          "Bank account could not be added ",
          "Please check your details and try again"
        );
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  const listBankCodes = async () => {
    setLoad(true);
    try {
      const res = await listBankCodesApi(userStore?.id_token);
      console.log(res, "bkl");
      if (res?.status === 200) {
        setBanksList(res?.data?.data);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  const checkBank = async () => {
    setLoad(true);
    try {
      const res = await checkBankApi(userStore?.id_token);
      console.log(res, 33);
      if (res?.data?.data?.account_number) {
        setData(res?.data?.data);
        setAcNum(res?.data?.data?.account_number);
        setIsUpdate(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listBankCodes();
    checkBank();
  }, []);

  console.log(data);
  return (
    <ScreenWrapper dismissKeyboard={false}>
      <Modal visible={loadV} transparent onDismiss={() => setLoadV(false)}>
        <Pressable
          style={{
            backgroundColor: "#00000098",
            flex: 1,
            justifyContent: "center",
          }}
          onPress={() => setLoadV(false)}
        >
          <View
            style={{
              minHeight: 163,
              backgroundColor: "#fff",
              marginHorizontal: "3%",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              width: "94%",
              zIndex: 99,
            }}
          >
            {!data?.notFound && (
              <>
                <LottieView
                  source={require("../../../assets/lottie/searchBank.json")}
                  autoPlay
                  loop
                  style={{
                    height: 48,
                    width: 48,
                  }}
                />
                <Text
                  style={{
                    color: "#1F1F1F",
                    fontWeight: "800",
                    marginTop: 30,
                  }}
                >
                  Searching for account
                </Text>
              </>
            )}
            {data?.notFound && (
              <>
                <View
                  style={{
                    backgroundColor: "#FEF6E7",
                    height: 48,
                    width: 48,
                    borderRadius: 24,
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../../assets/moreIcons/caution.png")}
                    height={30}
                    width={30}
                  />
                </View>
                <Text
                  style={{
                    color: "#1F1F1F",
                    fontWeight: "600",
                    marginTop: 15,
                  }}
                >
                  Account not found
                </Text>

                <View
                  style={{
                    width: "70%",
                    marginTop: 20,
                  }}
                >
                  <CustomButton
                    onPress={() => {
                      setData({ ...data, notFound: false });
                      setLoadV(false);
                    }}
                    Icon={
                      <Ionicons name="arrow-back" color={"#fff"} size={20} />
                    }
                    label="Go back"
                    style={{
                      height: 38,
                      width: "100%",
                    }}
                  />
                </View>
              </>
            )}
          </View>
        </Pressable>
      </Modal>

      <>
        <View
          style={{
            marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",

            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            marginBottom: 30,
          }}
        >
          <BackButton type={2} onPress={() => navigation.goBack()} />
          <Text
            style={{
              color: "#101928",
              fontWeight: "600",
              fontSize: 20,
            }}
          >
            Add your account details
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: "3%",
          }}
        >
          {load ? (
            <VeculAppLoader />
          ) : (
            <>
              <View style={{ flex: 1, marginTop: 0 }}>
                <View>
                  <DropDownBank
                    data={banksList}
                    value={data?.bank_name}
                    sep=""
                    label="Bank name"
                    placheHolder="Select bank"
                    heightDD={70}
                    onChange={(e) => {
                      setData({
                        ...data,
                        bank_name: e?.name,
                        bank_code: e?.bank_code,
                      });
                    }}
                    textAlign="left"
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <InputField
                    borderColor={
                      data?.notFound &&
                      (data?.notFound ? COLORS.red : COLORS.green)
                    }
                    placheHolder="1234567890"
                    label="Account number"
                    keyType={"numeric"}
                    value={accNum}
                    maxEntry={10}
                    onChange={async (e) => {
                      setAcNum(e);
                      setData({ ...data, account_number: e });
                      if (e.length === 10) {
                        setLoadV(true);
                        // call bank verify api
                        try {
                          const res = await verifyBankAccountApi(
                            {
                              account_number: e,
                              bank_code: "058",
                            },
                            userStore?.id_token
                          );
                          if (
                            !res?.data.message.includes(
                              "Could not resolve account name"
                            )
                          ) {
                            setData({
                              ...data,
                              notFound: false,
                              account_name: res?.data?.data?.account_name,
                            });
                            setLoadV(false);
                          } else {
                            setData({ ...data, notFound: true });
                          }
                        } catch (error) {
                          console.log(error);
                        }
                      }
                    }}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <InputField
                    label="Account holder"
                    value={data?.account_name}
                    disabled={true}
                    bgColor="#F0F2F5"
                  />
                </View>
              </View>
            </>
          )}

          <View
            style={{
              position: "absolute",
              bottom: 10,
              height: 40,
              width: "100%",
              left: "3%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomButton
              style={{ height: 40 }}
              disabled={disableFn()}
              onPress={() => {
                isUpdate ? updateBankAccount() : addBankAccount();
              }}
              label={isUpdate ? "Update account" : "Add account"}
            />
          </View>
        </View>
      </>
    </ScreenWrapper>
  );
};

export default AccUpdate;
