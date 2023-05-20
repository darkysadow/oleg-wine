export const getBasket = (state) => {
    return state.basketReducer.basket
}

export const getGoodsCountCart = (state) => {
    return state.basketReducer.basket.length
}

export const getBasketGoodsId = (state) => {
    let arr = []
    arr = state.basketReducer.basket.map(good => good.goodId)
    window.ids = arr
    return arr
}