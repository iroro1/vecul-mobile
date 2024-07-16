import { AnimatePresence } from "moti";
import React, { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";
import { getCarByIdApi } from "../../../services/coreService";
import CarDetailComponentChat from "./CarDetailComponentChat";

const CarDetailChat = (props) => {
  const { navigation, route } = props;
  const dt = route.params.data;
  const userStore = useSelector((state) => state?.app?.authState?.userResponse);
  const [modal, setModal] = useState("");
  const [data, setData] = useState(dt);
  const [load, setLoad] = useState(false);

  const loadDetail = async () => {
    setLoad(true);
    try {
      const res = await getCarByIdApi(
        {
          car_id: dt?.sk,
        },
        userStore?.id_token
      );

      if (res?.status === 200) {
        setData(res?.data?.data?.car);
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };
  useEffect(() => {
    loadDetail();
  }, []);
  const toast = useToast();
  const rentFn = () => {
    navigation.navigate("RentCar", { data: data });
  };

  console.log(dt, "dt");
  return (
    <AnimatePresence>
      <CarDetailComponentChat
        data={data}
        modal={modal}
        setModal={setModal}
        rentFn={rentFn}
        navigation={navigation}
      />
    </AnimatePresence>
  );
};

export default CarDetailChat;
