import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CarDetailComponent from "../../../components/CarDetailComponent";
import VeculAppLoader from "../../../components/VeculAppLoader";
import useRefreshToken from "../../../hooks/useRefreshToken";
import { getCarByIdApi } from "../../../services/coreService";
import { authSelector } from "../../../store/appSlice";
import ScreenWrapper from "../../ScreenWrapper";

const CarDetail = (props) => {
  const { navigation, route } = props;
  const dt = route.params.data;
  const userStore = useSelector(authSelector);
  const [modal, setModal] = useState("");
  const [data, setData] = useState();
  const [load, setLoad] = useState(false);
  const { callRefresh } = useRefreshToken();

  const loadDetail = async () => {
    setLoad(true);
    const obj = userStore?.id_token
      ? {
          car_id: dt,
          user_id: userStore?.sub,
        }
      : {
          car_id: dt,
        };
    try {
      const res = await getCarByIdApi(obj, userStore?.id_token);
      console.log(res, "rss");
      if (res?.status === 200) {
        setData(res?.data?.data?.car);
      } else {
        if (res?.response?.status === 401) {
          const r = await callRefresh();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  useEffect(() => {
    loadDetail();
  }, []);
  return (
    <ScreenWrapper dismissKeyboard={false}>
      {load ? (
        <VeculAppLoader />
      ) : (
        <CarDetailComponent
          dt={data}
          modal={modal}
          setModal={setModal}
          navigation={navigation}
        />
      )}
    </ScreenWrapper>
  );
};

export default CarDetail;
