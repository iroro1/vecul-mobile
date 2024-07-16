export const setFavoriteCarFunction = (arr, payload) => {
  return arr.map((itm) => {
    if (itm.sk === payload.sk) {
      return { ...itm, isLiked: !itm.isLiked };
    } else return itm;
  });
};
