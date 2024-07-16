import { Ionicons } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import InputField from "../../../components/InputField";
import PasswordInputField from "../../../components/PasswordInputField";
import {
  capitalize,
  currencyPipe,
  delayFn,
  epochToDateFull,
  yearsFn,
} from "../../../utils";
import {
  checkBankApi,
  loadTransactionsApi,
  loadWalletApi,
  withdrawalApi,
} from "../../../services/paymentService";
import VeculAppLoader from "../../../components/VeculAppLoader";
import { useSelector } from "react-redux";
import { authSelector } from "../../../store/appSlice";
import ScreenWrapper from "../../ScreenWrapper";
import TextCustom from "../../../components/TextCustom";
import { fontsPoppins } from "../../../utils/fonts";
import { COLORS } from "../../../utils/colors";
import useToast from "../../../hooks/useToast";
import ToastBoxVecul from "../../../components/ToastBoxVecul";
import LottieView from "lottie-react-native";

const MyEarnings = (props) => {
  const { navigation } = props;
  const [trx, setTrx] = useState([]);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [moreModal, setMoreModal] = useState(false);
  const [yrModal, setYrModal] = useState(false);
  const [yr, setYr] = useState("");
  const [bal, setBal] = useState(0);
  const [pendingBal, setPendingBal] = useState(0);
  const [lastWithdrawal, setLastWithdrawal] = useState(0);
  const [err, setErr] = useState(false);
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [success, setSuccess] = useState(false);
  const userStore = useSelector(authSelector);
  const [fetchKey, setFetchKy] = useState("");
  const [withdrawalData, setWithdrawalData] = useState({ amount: "", pin: "" });
  const { toast } = useToast();
  const checkBank = async () => {
    setLoad(true);
    try {
      const res = await checkBankApi(userStore?.id_token);
      console.log(res, 33);
      if (res?.status === 200) {
        loadTrxs();
      } else {
        navigation.navigate("AccUpdate");
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loadTrxs = async () => {
    try {
      const res = await loadWalletApi(
        { last_evaluated_key: fetchKey },
        userStore?.id_token
      );
      console.log(res, "TRX");
      if (res?.status === 200) {
        //
        setBal(res?.data?.data?.available_balance);
        setPendingBal(res?.data?.data?.pending_balance);
        setLastWithdrawal(res?.data?.data?.last_withdrawal);
        setFetchKy(res?.data?.data?.last_evaluated_key);
        setTrx(res?.data?.data?.transactions);
      } else {
        //
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  const withdrawFn = async () => {
    setLoad2(true);
    try {
      const res = await withdrawalApi(
        withdrawalData.amount,
        withdrawalData.pin,
        userStore?.id_token
      );
      console.log(res, "WITDRAW");
      if (res?.status === 200) {
        //
        if (res?.data?.message === "Unable to withdraw") {
          toast("error", res?.data?.message);
        } else {
          toast("success", res?.data?.message);
          setSuccess(true);
          loadTrxs();
        }
      } else {
        //
        toast("error", res?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoad2(false);
  };
  useEffect(() => {
    checkBank();
  }, []);
  return (
    <ScreenWrapper dismissKeyboard={false}>
      <Modal visible={yrModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#00000098",
              height: "100%",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 0,
            }}
            onPress={() => setYrModal(false)}
          >
            <View
              style={{
                height: 322,
                width: "90%",
                marginHorizontal: "3%",
                backgroundColor: "#FAFAFA",
                borderRadius: 8,
                zIndex: 99,
                position: "absolute",
                overflow: "hidden",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginVertical: 15,
                  fontWeight: "700",
                }}
              >
                Select year
              </Text>
              <ScrollView
                style={{
                  maxHeight: 220,
                }}
              >
                {yearsFn().map((yr) => (
                  <TouchableOpacity
                    key={yr}
                    style={{
                      height: 60,
                      borderBottomColor: "#ddd",
                      borderBottomWidth: 1,
                      minWidth: "80%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      setYr(yr);
                      setYrModal(false);
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "400",
                        fontSize: 20,
                      }}
                    >
                      {yr}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  paddingTop: 4,
                }}
              >
                <CustomButton
                  style={{
                    width: "45%",
                    height: 44,
                    borderColor: "#D0D5DD",
                    borderWidth: 1,
                    backgroundColor: "transparent",
                  }}
                  textStyles={{
                    color: "#344054",
                  }}
                  onPress={() => {}}
                  label="Cancel"
                />
                <CustomButton
                  style={{
                    width: "45%",
                    height: 44,
                  }}
                  onPress={() => {}}
                  label="Select"
                />
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>
      <Modal visible={moreModal} transparent animationType="slide">
        <View
          style={{
            backgroundColor: "#00000098",
            flex: 1,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#00000098",
              height: "100%",
              position: "relative",
            }}
            onPress={() => setMoreModal(false)}
          ></Pressable>
          <View
            style={{
              height: 311,
              backgroundColor: "#fff",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              position: "absolute",
              bottom: 0,
              zIndex: 99,
              width: "100%",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  height: 4,
                  width: 46,
                  backgroundColor: "#7F7F7F",
                }}
              ></View>
            </View>
            <Text
              style={{
                textAlign: "center",
                marginVertical: 20,
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              More options
            </Text>
            <View
              style={{
                marginHorizontal: "3%",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                  marginBottom: 30,
                }}
                onPress={() => {
                  setMoreModal(false);
                  navigation.navigate("AccUpdate");
                }}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    backgroundColor: "#E3EFFC",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    height={20}
                    width={20}
                    source={require("../../../assets/icons/file.png")}
                  />
                </View>
                <Text>Update account details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                }}
                onPress={() => {
                  setMoreModal(false);
                  delayFn(() => {
                    setYrModal(true);
                  }, 100);
                }}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    backgroundColor: "#E7F6EC",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    height={20}
                    width={20}
                    source={require("../../../assets/icons/calendar.png")}
                  />
                </View>
                <Text>Select transaction year</Text>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 30,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 4,
                }}
              >
                <CustomButton
                  onPress={() => {
                    setMoreModal(false);
                  }}
                  Icon={
                    <Ionicons name="arrow-back" size={18} color={"#344054"} />
                  }
                  style={{
                    borderWidth: 1,
                    borderColor: "#D0D5DD",
                    backgroundColor: "transparent",
                  }}
                  textStyles={{
                    fontSize: 14,
                    color: "#344054",
                  }}
                  label="Go back"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={withdrawModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#00000090",
              height: "100%",
              position: "relative",
            }}
            onPress={() => {
              setWithdrawModal(false);
              setSuccess(false);
            }}
          ></Pressable>
          <View
            style={{
              height: 370,
              backgroundColor: "#fff",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              position: "absolute",
              bottom: 0,
              zIndex: 99,
              width: "100%",
            }}
          >
            {success ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <View style={{ width: 167, height: 167 }}>
                  <LottieView
                    loop={false}
                    autoPlay
                    style={{
                      width: 167,
                      height: 167,
                    }}
                    source={require("../../../assets/lottie/succesStoreCreation.json")}
                    // autoPlay
                  />
                </View>

                <TextCustom>Withdrawal Successful</TextCustom>
              </View>
            ) : (
              <>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      height: 4,
                      width: 46,
                      backgroundColor: "#7F7F7F",
                    }}
                  ></View>
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    marginVertical: 20,
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  Withrawal details
                </Text>
                <View
                  style={{
                    marginHorizontal: "3%",
                  }}
                >
                  <View
                    style={{
                      position: "relative",
                    }}
                  >
                    <InputField
                      borderColor={err && "#E26E6A"}
                      keyType={"numeric"}
                      label="Amount to withdraw"
                      placheHolder="0.00"
                      onChange={(e) => {
                        console.log(e);
                        if (+e > +bal) setErr(true);
                        else setErr(false);

                        setWithdrawalData({
                          ...withdrawalData,
                          amount: e,
                        });
                      }}
                    />
                    {err && (
                      <Text
                        style={{
                          position: "absolute",
                          bottom: -20,
                          left: 0,
                          fontSize: 12,
                          color: "#E26E6A",
                        }}
                      >
                        Amount is more than the available balance
                      </Text>
                    )}
                    <Text
                      style={{
                        position: "absolute",
                        bottom: err ? -40 : -20,
                        right: 0,
                        fontSize: 12,
                        color: bal <= 0 ? COLORS.red : "#0F973D",
                      }}
                    >
                      Available balance: {currencyPipe(bal)}
                    </Text>
                  </View>
                  <View style={{ marginTop: err ? 40 : 25 }}>
                    <InputField
                      placheHolder={"Transaction Pin"}
                      label="Transaction Pin"
                      maxEntrys={4}
                      onChange={(e) => {
                        setWithdrawalData({
                          ...withdrawalData,
                          pin: e,
                        });
                      }}
                    />
                  </View>

                  <View
                    style={{
                      marginTop: 30,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 4,
                    }}
                  >
                    <CustomButton
                      onPress={() => {
                        setErr(false);
                        setWithdrawModal(false);
                      }}
                      Icon={
                        <Ionicons
                          name="arrow-back"
                          size={18}
                          color={"#344054"}
                        />
                      }
                      style={{
                        width: 119,
                        borderWidth: 1,
                        borderColor: "#D0D5DD",
                        backgroundColor: "transparent",
                      }}
                      textStyles={{
                        fontSize: 14,
                        color: "#344054",
                      }}
                      label="Go back"
                    />
                    <CustomButton
                      onPress={() => {
                        withdrawFn();
                        setErr(false);
                      }}
                      loading={load2}
                      disabled={
                        bal <= 0 ||
                        !withdrawalData.amount ||
                        !withdrawalData.pin ||
                        load2
                      }
                      style={{
                        width: "65%",
                      }}
                      label="Proceed"
                    />
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <View
        style={{
          marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          marginTop: 0,
          marginBottom: 30,
        }}
      >
        <BackButton type={2} onPress={() => navigation.goBack()} />

        <TextCustom
          style={{
            color: "#101928",
            fontWeight: "600",
            fontSize: 20,
          }}
          fontFamily={fontsPoppins.p6SemiBold}
        >
          My earnings
        </TextCustom>
      </View>

      {load ? (
        <VeculAppLoader />
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#001633",
              height: 186,
              borderRadius: 8,
              marginHorizontal: Platform.OS === "ios" ? "3%" : "0%",
              position: "relative",
              padding: 18,
            }}
          >
            <View
              style={{
                height: 83,
                borderBottomWidth: 1,
                borderBottomColor: "#132F54",
              }}
            >
              <Text
                style={{
                  color: "#98A2B3",
                  fontSize: 10,
                }}
              >
                AVAILABLE BALANCE
              </Text>
              <Text
                style={{
                  color: "#F9FAFB",
                  fontSize: 25,
                  marginTop: 10,
                  fontWeight: "600",
                }}
              >
                {currencyPipe(bal)}
              </Text>
            </View>
            <View
              style={{
                height: 93,
                paddingTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    color: "#98A2B3",
                    fontSize: 10,
                  }}
                >
                  LAST WITHDRAWAL
                </Text>
                <Text
                  style={{
                    color: "#F9FAFB",
                    fontSize: 20,
                    marginTop: 10,
                  }}
                >
                  {currencyPipe(lastWithdrawal)}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: "#98A2B3",
                    fontSize: 10,
                  }}
                >
                  PENDING BALANCE
                </Text>
                <Text
                  style={{
                    color: "#F9FAFB",
                    fontSize: 20,
                    marginTop: 10,
                  }}
                >
                  {currencyPipe(pendingBal)}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: "3%",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: "#101928",
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              Transaction History
            </Text>
          </View>
          {trx?.length === 0 && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 242,
                }}
              >
                <Image
                  height={120}
                  width={120}
                  source={require("../../../assets/images/earnEmpty.png")}
                />
                <Text
                  style={{
                    color: "#000000",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 20,
                    marginBottom: 8,
                  }}
                >
                  No transaction yet
                </Text>
                <Text
                  style={{
                    color: "#475367",
                    textAlign: "center",
                  }}
                >
                  There is no transaction made yet. All transactions will appear
                  here.
                </Text>
              </View>
            </View>
          )}
          {trx?.length > 0 && (
            <ScrollView
              style={{
                flex: 1,
                marginHorizontal: "3%",
                marginTop: 20,
              }}
              showsVerticalScrollIndicator={false}
            >
              {trx.map((trans) => (
                <View
                  style={{
                    marginBottom: 20,
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    borderBottomColor: "#F0F2F5",
                    flexDirection: "row",
                    gap: 8,
                    alignItems: "center",
                  }}
                  key={trans?.sk}
                >
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      backgroundColor:
                        trans.type === "withdraw" ? "#FFECE5" : "#E3EFFC",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      width={20}
                      height={20}
                      source={
                        trans.type === "withdraw"
                          ? require("../../../assets/icons/money-out.png")
                          : require("../../../assets/icons/money-in.png")
                      }
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "85%",
                      minHeight: 40,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: "#101928",
                          fontSize: 18,
                          fontWeight: "600",
                        }}
                      >
                        {capitalize(trans.title)}
                      </Text>
                      <Text
                        style={{
                          color: "#667185",
                          fontSize: 12,
                          fontWeight: "600",
                          marginTop: 5,
                        }}
                      >
                        {epochToDateFull(trans?.created_at)}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontWeight: "600",
                          color:
                            trans.type !== "credit" ? "#D42620" : "#40B869",
                        }}
                      >
                        {trans.type === "credit" ? "+" : "-"}{" "}
                        {currencyPipe(trans.amount)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
          <View
            style={{
              paddingHorizontal: "3%",
              flexDirection: "row",
              gap: 8,
              marginTop: 8,
            }}
          >
            <CustomButton
              textStyles={{ fontWeight: "800" }}
              label="Withdraw funds"
              style={{
                // width: "100%",
                width: "80%",
                height: 44,
              }}
              onPress={() => setWithdrawModal(true)}
            />
            <CustomButton
              fw="900"
              textStyles={{
                fontWeight: "800",
                color: "#1038C3",
              }}
              label=""
              style={{
                width: 75,
                backgroundColor: "transparent",
                borderColor: "#1038C3",
                borderWidth: 1,
                height: 44,
              }}
              onPress={() => setMoreModal(true)}
              Icon={
                <>
                  <Ionicons size={4} name="at-circle" color={"#1038C3"} />
                  <Ionicons size={4} name="at-circle" color={"#1038C3"} />
                  <Ionicons size={4} name="at-circle" color={"#1038C3"} />
                </>
              }
            />
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
};

export default MyEarnings;
