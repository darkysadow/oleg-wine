export const getGoods = (state) => {
    return state.goodsReducer.goods;
}

export const getCategoriesArray = (state) => {
    return state.goodsReducer.categories;
}