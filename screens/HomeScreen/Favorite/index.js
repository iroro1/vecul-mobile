import { AnimatePresence, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import useAuth from "../../../hooks/useAuth";
import {
  likeCarApi,
  listFavoritesApi,
} from "../../../services/favoriteService";
import { COLORS } from "../../../utils/colors";
import CarListing from "../CarListings/CarListing";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { authSelector, pathSelector } from "../../../store/appSlice";
import useRefreshToken from "../../../hooks/useRefreshToken";
import VeculAppLoader from "../../../components/VeculAppLoader";
import NotFound from "../../../components/NotFound";
const Favorite = () => {
  const { userData } = useAuth();
  const userStore = useSelector(authSelector);
  const [favList, setFavList] = useState([]);
  const [load, setLoad] = useState(true);
  const path = useSelector(pathSelector);
  const { callRefresh } = useRefreshToken();

  const loadFavorites = async () => {
    setLoad(true);
    try {
      const res = await listFavoritesApi({}, (userStore || userData)?.id_token);
      if (res?.status === 200) {
        setFavList(res?.data.data.cars);
      } else if (res?.response?.status === 401) {
        callRefresh();
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  useEffect(() => {
    loadFavorites();
  }, [path]);

  return (
    <AnimatePresence>
      <SafeAreaView
        style={{
          flex: 1,
          minHeight: "100%",
          position: "relative",
          width: "100%",
          backgroundColor: "#fff",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <MotiView
          from={{ opacity: 0 }}
          animate={{
            opacity: 1,
            backgroundColor: "#fff",
            flex: 1,
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
              paddingHorizontal: "3%",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: COLORS.greyDark,
              }}
            >
              Favourites
            </Text>
          </View>
          {load ? (
            <VeculAppLoader />
          ) : (
            <>
              {favList.length > 0 && (
                <FlatList
                  style={{
                    flex: 1,
                    paddingTop: 30,
                  }}
                  data={favList}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        position: "relative",
                        marginBottom: 15,
                        marginHorizontal:
                          Platform.OS === "android" ? "3%" : "0%",
                      }}
                      key={item?.id}
                    >
                      <CarListing
                        onChangeLike={() => {
                          loadFavorites();
                        }}
                        type={2}
                        key={item.id}
                        data={item}
                        onChangeike={() => loadFavorites()}
                        authState={true}
                      />
                    </View>
                  )}
                  ListFooterComponent={() => <View style={{ height: 100 }} />}
                  onEndReached={() => console.log("end")}
                  onEndReachedThreshold={0.5}
                  onRefresh={() => loadFavorites()}
                  refreshing={false}
                />
              )}

              {!load && favList.length === 0 && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <NotFound
                    title={"No Favourites found"}
                    subTitle={"You have not saved any rides to favourites yet."}
                  >
                    <Image
                      source={require("../../../assets/images/emptySearch.png")}
                    />
                  </NotFound>
                </View>
              )}
            </>
          )}
        </MotiView>
      </SafeAreaView>
    </AnimatePresence>
  );
};

export default Favorite;
