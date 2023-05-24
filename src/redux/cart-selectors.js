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

export const getSumm = (state) => {
    if (state.cartReducer.cart) {
        let summ = 0
        for (let i = 0; i < state.cartReducer.cart.length; i++) {
            summ += state.cartReducer.cart[i].count * state.cartReducer.cart[i].price
        }
        return summ;
    }
}