//consts
const ADD_GOOD = 'ADD_GOOD'
const DELETE_GOOD = 'DELETE_GOOD'


//initial state
let initialState = {
    cart: []
}

let cartReducer = (state = initialState, action) => {
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
                cart: [...state.cart, newGood]
            }
        case DELETE_GOOD:
            return {
                ...state,
                cart: state.cart.filter(item => item.goodId !== action.goodId)
            }
            

        default:
            return state;
    }
}

export const addGoodToCart = (goodId, count, price) => ({ type: ADD_GOOD, goodId, count, price})
export const deleteGoodFromCart = (goodId) => ({type: DELETE_GOOD, goodId})

export default cartReducer;