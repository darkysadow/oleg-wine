export const getBasket = (state) => {
    return state.basketReducer.basket
}

export const getGoodsCountCart = (state) => {
    console.log(state.basketReducer.basket)
    return state.basketReducer.basket.length
}