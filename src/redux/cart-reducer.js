//consts
const ADD_GOOD = 'ADD_GOOD'
const DELETE_GOOD = 'DELETE_GOOD'
const UPDATE_GOOD_COUNT = 'UPDATE_GOOD_COUNT'


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
                summ: action.price * action.count,
                category: action.category
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
        case UPDATE_GOOD_COUNT:
            const updatedItems = state.cart.map(item => {
                if (item.goodId === action.goodId) {
                  // Оновлення властивості об'єкта
                  return {
                    ...item,
                    count: action.newValue
                  };
                }
                return item;
              });
              return {
                ...state,
                cart: updatedItems
              };

        default:
            return state;
    }
}

export const addGoodToCart = (goodId, count, price, category) => ({ type: ADD_GOOD, goodId, count, price, category})
export const deleteGoodFromCart = (goodId) => ({type: DELETE_GOOD, goodId})
export const updateGoodCount = (goodId, newValue) => ({type: UPDATE_GOOD_COUNT, goodId, newValue})

export default cartReducer;