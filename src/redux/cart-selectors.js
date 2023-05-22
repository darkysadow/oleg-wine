export const getCart = (state) => {
    return state.cartReducer.cart
}

export const getGoodsCountCart = (state) => {
    return state.cartReducer.cart.length
}

export const getCartGoodsId = (state) => {
    let arr = []
    arr = state.cartReducer.cart.map(good => good.goodId)
    window.ids = arr
    return arr
}