import { View, Text, RefreshControl, FlatList } from "react-native";
import React, { useState } from "react";

const FlatListLoadMore = ({
  RenderItem,
  extractor,
  data = [],
  ListFooterComponent,
  onEndReached = () => {},
  onEndReachedThreshold = 0.5,
  refreshing = false,
  scrollsToTop = false,
  canLoadMore = true,
  loadMoreFunction = () => {},
  loadFunction = () => {},
  style,
}) => {
  const [load, setLoad] = useState(false);
  return (
    <FlatList
      style={{
        flex: 1,
        marginTop: 5,
        minHeight: "100%",
        ...style,
      }}
      data={data}
      keyExtractor={(item) => item[extractor]}
      renderItem={({ item }) => (
        <RenderItem
          {...item}
          // authState={authState}
          // authFn={(e) => {
          //   !e && navigation.navigate("AuthStart");
          // }}
          // onChangeLike={() => loadCars()}
          // data={item}
        />
      )}
      ListFooterComponent={() =>
        ListFooterComponent || <View style={{ height: 300 }} />
      }
      onEndReached={() => {
        onEndReached();
        console.log("end");
      }}
      onEndReachedThreshold={onEndReachedThreshold}
      refreshing={refreshing}
      scrollsToTop={scrollsToTop}
      canLoadMore={canLoadMore}
      onLoadMoreAsync={loadMoreFunction}
      onRefresh={() => setLoad(true)}
      refreshControl={
        <RefreshControl refreshing={load} onRefresh={loadFunction} />
      }
    />
  );
};

export default FlatListLoadMore;
