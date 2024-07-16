import { Ionicons } from "@expo/vector-icons";
import { AnimatePresence, MotiView } from "moti";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../../../components/BackButton";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../utils/colors";
const ChatDetailMain = (props) => {
  const { navigation } = props;

  const [chats, setChats] = useState([
    {
      id: 1,
      type: "Info",
      text: "I had a very good time with the car. Returning it as early as possible before the expiration... ",
      user: "user",
      img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },

    {
      id: 4,
      breakDate: "Wed 19 Nov, 2023",
    },
    {
      id: 3,
      text: "Returning it as early as possible before the expiration... ",
      user: "user",
      img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]);
  const [focus, setFocus] = useState(false);
  const [ddMenu, setDDMenu] = useState(false);
  const [rentDetailsModal, setRentDetailsModal] = useState(false);
  const [eorModal, setEorModal] = useState(false);
  const [eofReq, setEofReq] = useState(false);
  const [ended, setEnded] = useState(false);
  const [rateRide, setRateRide] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const data = props?.route?.params?.data;
  const tempDetail = {
    created_at: 1706729967,
    car_addresses: {
      return_address: "23, Oniru Estate, Lagos Island Nigeria",
      pickup_address: "23, Oniru Estate, Lagos Island Nigeria",
    },
    car_type: "truck",
    vehicle_images: [
      "https://dzrsteit2h2vm.cloudfront.net/vecul/ca7d37d6-e689-40a5-a7b2-8c74d4651e9d/images/f46f6c55-fbbd-4ef5-9e0a-2d687aac05f9-1706729416606.jpeg",
      "https://dzrsteit2h2vm.cloudfront.net/vecul/ca7d37d6-e689-40a5-a7b2-8c74d4651e9d/images/599e0d4c-d42e-4367-8059-4cb5549fcfbb-1706729416606.jpeg",
      "https://dzrsteit2h2vm.cloudfront.net/vecul/ca7d37d6-e689-40a5-a7b2-8c74d4651e9d/images/db4abffa-09b2-4c38-921c-0fe9bffc5150-1706729416606.jpeg",
      "https://dzrsteit2h2vm.cloudfront.net/vecul/ca7d37d6-e689-40a5-a7b2-8c74d4651e9d/images/646b9272-01a5-482a-97fa-b83479ecb79a-1706729416606.jpeg",
      "https://dzrsteit2h2vm.cloudfront.net/vecul/ca7d37d6-e689-40a5-a7b2-8c74d4651e9d/images/89d3db13-3cac-481c-a52a-39e00bbd9487-1706729416606.jpeg",
      "https://dzrsteit2h2vm.cloudfront.net/vecul/ca7d37d6-e689-40a5-a7b2-8c74d4651e9d/images/d9e73e1a-6066-4c50-b8b7-86d0c86542f0-1706729416606.jpeg",
      "https://dzrsteit2h2vm.cloudfront.net/vecul/ca7d37d6-e689-40a5-a7b2-8c74d4651e9d/images/3ddf4baa-36f8-45be-ac6f-47fcbfe61f5c-1706729416606.jpeg",
      "https://dzrsteit2h2vm.cloudfront.net/vecul/ca7d37d6-e689-40a5-a7b2-8c74d4651e9d/images/321da2d2-1e55-4604-a161-18d18b523758-1706729416606.jpeg",
    ],
    car_features: {
      doors: 4,
      airbags: 5,
      air_condition: "yes",
      bluetooth: "yes",
      seats: 5,
      fuel: "petrol",
    },
    car_availabilty: "yes",
    updated_at: 1706729967,
    user_id: "ca7d37d6-e689-40a5-a7b2-8c74d4651e9d",
    rental_description:
      "Hello, I have a Bz4X Ev 4D XLE 2023 Very reliable\nFell free to contact me during the rental at any Ask for Mohammed\nThank you and I hope you will like our ride\nKindly leave us a review\nWe hope you will have a great time using our service....",
    car_brand: "toyota",
    vehicle_registration_due_date: "01/02/2023",
    vin: "12345678912345678",
    car_year: "2023",
    sk: "car_210e07f8-26f6-492b-b870-003a6ffe0554",
    car_name: "Toyota bZ4X",
    price: "52000",
    pk: "car",
  };

  return (
    <AnimatePresence>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          flex: 1,
          minHeight: "100%",
          position: "relative",
          width: "100%",
          backgroundColor: "#fff",
          paddingHorizontal: "3%",
        }}
      >
        <Modal visible={rentDetailsModal} animationType="fade" transparent>
          <View
            style={{
              flex: 1,
              backgroundColor: "#00000090",
            }}
          >
            <Pressable
              style={{
                height: "68%",
              }}
              onPress={() => {
                setRentDetailsModal(false);
                setDDMenu(false);
              }}
            ></Pressable>
            <View
              style={{
                height: "32%",
                backgroundColor: "#fff",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                position: "relative",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#7F7F7F",
                    height: 4,
                    width: 46,
                    borderRadius: 18,
                  }}
                ></View>
              </View>

              <Text
                style={{
                  textAlign: "center",
                  marginVertical: 16,
                  fontWeight: "700",
                  fontSize: 20,
                }}
              >
                Rent details
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: "3%",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "400",
                    fontSize: 16,
                    color: "#667185",
                  }}
                >
                  Car Name
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "400",
                    fontSize: 16,
                  }}
                >
                  BMW M8
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: "3%",
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "400",
                    fontSize: 16,
                    color: "#667185",
                  }}
                >
                  Amount/Day
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "400",
                    fontSize: 16,
                  }}
                >
                  ₦3000
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: "3%",
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "400",
                    fontSize: 16,
                    color: "#667185",
                  }}
                >
                  Start date
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "400",
                    fontSize: 16,
                  }}
                >
                  12 February, 2024
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: "3%",
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "400",
                    fontSize: 16,
                    color: "#667185",
                  }}
                >
                  End date
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "400",
                    fontSize: 16,
                  }}
                >
                  15 February, 2024
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: "3%",
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "400",
                    fontSize: 16,
                    color: "#667185",
                  }}
                >
                  Amount Charged
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "400",
                    fontSize: 16,
                  }}
                >
                  ₦15,300
                </Text>
              </View>
            </View>
          </View>
        </Modal>
        <Modal visible={eorModal} animationType="fade" transparent>
          <View
            style={{
              flex: 1,
              backgroundColor: "#00000090",
            }}
          >
            <Pressable
              style={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setDDMenu(false);
                setEorModal(false);
                setRateRide(false);
              }}
            >
              {!rateRide ? (
                <View
                  style={{
                    height: "25%",
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    width: "95%",
                    bottom: 40,
                    marginHorizontal: "2.4%",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "left",
                      marginVertical: 16,
                      fontWeight: "700",
                      fontSize: 20,
                      marginLeft: 10,
                    }}
                  >
                    Request end of rental
                  </Text>

                  <Text
                    style={{
                      textAlign: "left",
                      fontWeight: "400",
                      fontSize: 16,
                      color: "#667185",
                      marginHorizontal: 10,
                    }}
                  >
                    This rental session will end once{" "}
                    <Text style={{ fontWeight: "700" }}>Chelsea Hagon</Text>{" "}
                    approves the request.
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      position: "absolute",
                      bottom: 40,
                      gap: 15,
                    }}
                  >
                    <CustomButton
                      Icon={<Ionicons size={20} name="arrow-back" />}
                      style={{
                        width: 119,
                        borderWidth: 1,
                        borderColor: "#D0D5DD",
                        backgroundColor: "transparent",
                      }}
                      textStyles={{
                        color: "#000",
                        marginLeft: 6,
                      }}
                      label="Go Back"
                      onPress={() => {
                        setDDMenu(false);
                        setEorModal(false);
                      }}
                    />
                    <CustomButton
                      style={{
                        width: 219,
                      }}
                      label="Continue"
                      onPress={() => {
                        setRateRide(true);
                      }}
                    />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    height: 303,
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    // position: "absolute",
                    width: "95%",
                    bottom: 40,
                    marginHorizontal: "2.4%",
                    padding: "3%",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 16,
                      fontWeight: "700",
                      fontSize: 20,
                      marginLeft: 10,
                    }}
                  >
                    Rental rating
                  </Text>

                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "400",
                      fontSize: 16,
                      color: "#667185",
                      marginHorizontal: 10,
                      marginVertical: 8,
                      marginBottom: 20,
                    }}
                  >
                    Please rate your experience below
                  </Text>

                  <View>
                    <MotiView
                      animate={{
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 10,
                      }}
                    >
                      <Ionicons
                        name={rating >= 1 ? "star" : "star-outline"}
                        size={25}
                        onPress={() => setRating(1)}
                        color={rating >= 1 ? "#F5B546" : "#aaa"}
                      />
                      <Ionicons
                        name={rating >= 2 ? "star" : "star-outline"}
                        size={25}
                        onPress={() => setRating(2)}
                        color={rating >= 2 ? "#F5B546" : "#aaa"}
                      />
                      <Ionicons
                        name={rating >= 3 ? "star" : "star-outline"}
                        size={25}
                        onPress={() => setRating(3)}
                        color={rating >= 3 ? "#F5B546" : "#aaa"}
                      />
                      <Ionicons
                        name={rating >= 4 ? "star" : "star-outline"}
                        size={25}
                        onPress={() => setRating(4)}
                        color={rating >= 4 ? "#F5B546" : "#aaa"}
                      />
                      <Ionicons
                        name={rating === 5 ? "star" : "star-outline"}
                        size={25}
                        onPress={() => setRating(5)}
                        color={rating >= 5 ? "#F5B546" : "#aaa"}
                      />
                    </MotiView>
                  </View>
                  <Text
                    style={{
                      marginTop: 12,
                      marginBottom: 5,
                      color: "#101928",
                    }}
                  >
                    Comment (Optional)
                  </Text>
                  <View
                    style={{
                      height: 57,
                      borderColor: "#E4E7EC",
                      borderWidth: 1,
                      marginBottom: 20,
                    }}
                  >
                    <TextInput
                      style={{
                        height: 57,
                      }}
                      multiline
                    />
                  </View>
                  <CustomButton
                    label="Submit"
                    onPress={() => {
                      setEofReq(true);
                      setDDMenu(false);
                      setRateRide(false);
                      setEorModal(false);
                    }}
                  />
                </View>
              )}
            </Pressable>
          </View>
        </Modal>
        <Modal visible={rateRide} animationType="fade" transparent>
          <View
            style={{
              flex: 1,
              backgroundColor: "#00000090",
            }}
          >
            <Pressable
              style={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setDDMenu(false);
                setRateRide(false);
              }}
            >
              <View
                style={{
                  height: 303,
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  // position: "absolute",
                  width: "95%",
                  bottom: 40,
                  marginHorizontal: "2.4%",
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    marginVertical: 16,
                    fontWeight: "700",
                    fontSize: 20,
                    marginLeft: 10,
                  }}
                >
                  Rental rating
                </Text>

                <Text
                  style={{
                    textAlign: "left",
                    fontWeight: "400",
                    fontSize: 16,
                    color: "#667185",
                    marginHorizontal: 10,
                  }}
                >
                  Please rate your experience below
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    position: "absolute",
                    bottom: 40,
                    gap: 15,
                  }}
                >
                  <CustomButton label="Submit" onPress={() => {}} />
                </View>
              </View>
            </Pressable>
          </View>
        </Modal>
        <MotiView
          from={{ opacity: 0 }}
          animate={{
            opacity: 1,
            backgroundColor: "#fff",
            flex: 1,
            paddingHorizontal: "3%",
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            delay: 200,
          }}
        >
          <View
            style={{
              flex: 1,
              minHeight: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                minWidth: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <BackButton onPress={() => navigation.goBack()} type={2} />
                <Text
                  style={{
                    color: "#383838",
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  {data?.name || "Chealsea"} -{" "}
                  {data?.rent?.carName || "Audi X3"}
                </Text>
              </View>
              <View
                style={{
                  marginRight: 0,
                  position: "relative",
                }}
              >
                <Ionicons
                  size={20}
                  name={ddMenu ? "close" : "ellipsis-vertical"}
                  onPress={() => setDDMenu(!ddMenu)}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                minWidth: "100%",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 15,
              }}
            >
              {ddMenu && (
                <View
                  style={{
                    height: 116,
                    width: 173,
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderColor: "#ddd",
                    borderRadius: 8,
                    shadowColor: "#888",
                    shadowOffset: { width: 3, height: 3 },
                    shadowOpacity: 0.3,
                    shadowRadius: 1,
                    elevation: 1,
                    zIndex: 100,
                    marginBottom: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 35,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: 12,
                    }}
                    onPress={() => setRentDetailsModal(true)}
                  >
                    <Text
                      style={{
                        color: "#101928",
                        fontSize: 14,
                      }}
                    >
                      Rent details
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: 35,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: 12,
                    }}
                    onPress={() => {
                      setDDMenu(false);
                      navigation.navigate("CarDetailChat", { tempDetail });
                    }}
                  >
                    <Text
                      style={{
                        color: "#101928",
                        fontSize: 14,
                      }}
                    >
                      Car details
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      height: 35,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: 12,
                    }}
                    onPress={() => setEorModal(true)}
                  >
                    <Text
                      style={{
                        color: "#101928",
                        fontSize: 14,
                      }}
                    >
                      Request end of rental
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <FlatList
              style={{
                width: "100%",
                flex: 1,
                height: "100%",
                paddingHorizontal: "3%",
                flexDirection: "column-reverse",
                paddingTop: 150,
              }}
              data={chats}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) =>
                item?.breakDate ? (
                  <View
                    style={{
                      position: "relative",
                      marginTop: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "#bbb",
                        width: "100%",
                        position: "absolute",
                        top: 6,
                        left: 0,
                      }}
                    />
                    <View style={{ backgroundColor: "#fff", width: 100 }}>
                      <Text
                        style={{
                          color: "#888",
                          fontSize: 10,
                          textAlign: "center",
                        }}
                      >
                        {item?.breakDate}
                      </Text>
                    </View>
                  </View>
                ) : item?.type === "Info" ? (
                  <View
                    style={{
                      height: 132,
                      backgroundColor: "#F0F2F5",
                      marginTop: 15,
                      borderRadius: 8,
                      width: "100%",
                      padding: 16,
                      paddingRight: 20,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 12,
                      }}
                    >
                      <Text
                        style={{
                          color: "#1D2739",
                          fontSize: 12,
                        }}
                      >
                        Start date:
                      </Text>
                      <Text
                        style={{
                          color: "#101928",
                          fontSize: 12,
                        }}
                      >
                        {data?.rent?.startDate || "12 February, 2024"}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 12,
                      }}
                    >
                      <Text
                        style={{
                          color: "#1D2739",
                          fontSize: 12,
                        }}
                      >
                        End date:
                      </Text>
                      <Text
                        style={{
                          color: "#101928",
                          fontSize: 12,
                        }}
                      >
                        {data?.rent?.endDate || "15 February, 2024"}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 12,
                      }}
                    >
                      <Text
                        style={{
                          color: "#1D2739",
                          fontSize: 12,
                        }}
                      >
                        Amount Charged:
                      </Text>
                      <Text
                        style={{
                          color: "#101928",
                          fontSize: 12,
                        }}
                      >
                        ₦ {data?.rent?.amountCharged || "15,300"}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        borderBottomColor: COLORS.primary,
                        borderBottomWidth: 1,
                        width: 70,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        setDDMenu(false);
                        navigation.navigate("CarDetailChat", { tempDetail });
                      }}
                    >
                      <Text style={{ fontSize: 12, color: COLORS.primary }}>
                        View details
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : item?.user === "user" ? (
                  <View
                    style={{
                      marginTop: 35,
                      flexDirection: "row",
                      gap: 10,
                      width: "95%",
                      alignItems: "flex-end",
                      marginLeft: item?.user !== "user" && "auto",
                      marginRight: "auto",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor:
                          item?.user === "user" ? "#F0F2F5" : "#E0FFF9",
                        padding: 10,
                        borderRadius: 10,
                        position: "relative",
                      }}
                    >
                      <View
                        style={{
                          height: 30,
                          width: 30,
                          position: "absolute",
                          bottom: 0,
                          left: item?.user === "user" && 0,
                          right: item?.user !== "user" && 0,
                        }}
                      />
                      <Text
                        style={{
                          color: "#3F3D56",
                          fontSize: 13,
                          fontWeight: "400",
                        }}
                      >
                        {item.text}
                      </Text>
                      <View
                        style={{
                          position: "absolute",
                          bottom: -20,
                          left: 0,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                          }}
                        >
                          4:59 PM
                        </Text>
                        <Ionicons name="checkmark" />
                      </View>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      marginTop: 35,
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "flex-end",
                      marginLeft: "auto",
                      justifyContent: "flex-end",
                      marginRight: "3%",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor:
                          item?.user === "user" ? "#00B796" : "#1671D9",
                        padding: 10,
                        borderRadius: 10,
                        position: "relative",
                        width: "95%",
                      }}
                    >
                      <View
                        style={{
                          height: 30,
                          width: 30,
                          position: "absolute",

                          bottom: 0,
                          left: item?.user === "user" && 0,
                          right: item?.user !== "user" && 0,
                        }}
                      />
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 13,
                          fontWeight: "400",
                        }}
                      >
                        {item.text}
                      </Text>
                      <View
                        style={{
                          position: "absolute",
                          bottom: -20,
                          right: 0,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                          }}
                        >
                          4:59 PM
                        </Text>
                        <Ionicons name="checkmark" />
                      </View>
                    </View>
                  </View>
                )
              }
              ListFooterComponent={<View style={{ height: 100 }} />}
            />

            {eofReq || ended ? (
              <>
                {eofReq && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 5,
                        borderColor: "#F3A218",
                        borderWidth: 1,
                        padding: 4,
                        borderRadius: 16,
                        paddingHorizontal: 10,
                      }}
                    >
                      <Ionicons name="alert-circle-outline" color={"#F3A218"} />
                      <Text
                        style={{
                          color: "#F3A218",
                          fontSize: 13,
                          fontWeight: "600",
                        }}
                      >
                        You have sent a request to end this rental session
                      </Text>
                    </View>
                  </View>
                )}
                {ended && (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#667185",
                        width: "80%",
                        fontSize: 14,
                      }}
                    >
                      This rental session has concluded. You can no longer chat
                      with Chelsea Hagon
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <KeyboardAvoidingView
                // behavior={focus && "padding"}
                keyboardVerticalOffset={200}
                enabled
              >
                {data?.available ? (
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#3F3D56",
                        fontSize: 13,
                        fontWeight: "400",
                        textAlign: "center",
                        marginBottom: 21,
                        width: "72%",
                      }}
                    >
                      This rental session has concluded. You can no longer chat
                      with John Doe
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      position: "relative",
                      height: 46,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      marginHorizontal: "3%",
                      borderWidth: 1,
                      borderColor: "#C2C2C2",
                      borderRadius: 5,
                    }}
                  >
                    <TextInput
                      style={{
                        width: "90%",
                        paddingHorizontal: 9,
                        fontSize: 11,
                        backgroundColor: "#fff",
                      }}
                      multiline
                      value={text}
                      onChangeText={(text) => setText(text)}
                      placeholder="Type your message"
                      placeholderTextColor={"#808080"}
                      onFocus={() => setFocus(true)}
                      onBlur={() => setFocus(false)}
                    />
                    <TouchableOpacity
                      style={{
                        height: 46,
                        width: 36,
                        borderRadius: 17,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingRight: 9,
                      }}
                      onPress={() => {
                        if (!text) return;
                        setChats([
                          ...chats,
                          {
                            text,
                            user: "owner",
                            id: chats.length + 1,
                            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                          },
                        ]);
                        setText("");
                        setFocus(false);
                      }}
                    >
                      <Ionicons
                        // style={{
                        //   transform: [{ rotate: "320deg" }],
                        // }}
                        name="send"
                        color={chats.length > 1 ? COLORS.primary : "#98A2B3"}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </KeyboardAvoidingView>
            )}
          </View>
        </MotiView>
      </SafeAreaView>
    </AnimatePresence>
  );
};

export default ChatDetailMain;
