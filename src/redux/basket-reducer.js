//consts
const ADD_GOOD = 'ADD_GOOD'


//initial state
let initialState = {
    basket: []
}

let basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GOOD:
            let newGood = {
                goodId: action.goodId,
                count: action.count,
                price: action.price,
                summ: action.price * action.count
            }
            return {
                ...state,
                basket: [...state.basket, newGood]
            }
        default:
            return state;
    }
}

export const addGoodToBasket = (goodId, count, price) => ({ type: ADD_GOOD, goodId, count, price})

export default basketReducer;