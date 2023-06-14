import axios from "axios"

//consts
const ADD_GOOD = 'ADD_GOOD'
const DELETE_GOOD = 'DELETE_GOOD'
const UPDATE_GOOD_COUNT = 'UPDATE_GOOD_COUNT'
const CLEAR_CART = 'CLEAR_CART'
const UPDATE_ORDER_FORM_FIELD = 'UPDATE_ORDER_FORM_FIELD'
const CLEAR_USER_ORDER_FIELD = 'CLEAR_USER_ORDER_FIELD'


//initial state
let initialState = {
    cart: [],
    orderForm: {
        firstName: '',
        phoneNumber: '',
        email: '',
        comment: ''
    }
}

let cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GOOD:
            let newGood = {
                goodId: action.goodId,
                goodName: action.goodName,
                imgURL: action.imgURL,
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
        case CLEAR_CART:
            return {
                ...state,
                cart: []
            }
        case UPDATE_ORDER_FORM_FIELD:
            return {
                ...state,
                orderForm: {
                    ...state.orderForm,
                    [action.field]: action.newValue
                }
            }
        case CLEAR_USER_ORDER_FIELD:
            return {
                ...state,
                orderForm: {
                    firstName: '',
                    phoneNumber: '',
                    email: '',
                    comment: ''
                }
            }
        default:
            return state;
    }
}

export const addGoodToCart = (goodId, goodName, imgURL, count, price, category) => ({ type: ADD_GOOD, goodId, goodName, imgURL, count, price, category })
export const deleteGoodFromCart = (goodId) => ({ type: DELETE_GOOD, goodId })
export const updateGoodCount = (goodId, newValue) => ({ type: UPDATE_GOOD_COUNT, goodId, newValue })
export const clearCart = () => ({ type: CLEAR_CART })
export const updateUserOrderField = (field, newValue) => ({ type: UPDATE_ORDER_FORM_FIELD, field, newValue });
export const clearUserOrderField = () => ({ type: CLEAR_USER_ORDER_FIELD })

export const sendOrder = (formInfo, cart, summ, setUserAction) => (dispatch) => {
    const checkNominal = (category) => {
        if (category === 'вино') {
            return "л"
        } else if (category === "виноград") {
            return "кг"
        } else {
            return "шт"
        }
}
    const TOKEN = '6006103677:AAEDNp3ZKzv6WYYU46bLOhUvjQrUzkeXdbA';
    const CHAT_ID = '-1001905089338';
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    let message = `<b>Відправник: </b> ${formInfo.firstName}\n`;
    message += `<b>Номер телефону: </b> ${formInfo.phoneNumber}\n`;
    message += `<b>Email: </b> ${formInfo.email}\n`;
    if (formInfo.comment.length > 0) {
        message += `<b>Коментар до замовлення: </b> ${formInfo.comment}\n\n\n`;
    }
    message += `<b>Список замовлення: </b>\n`;
    cart.map(item => message += `<b> ${item.category}:</b> ${item.goodName},
        \t <b>Кількість: </b>${item.count} ${checkNominal(item.category)},
        \t <b>Ціна: </b>${item.price} грн/${checkNominal(item.category)},
        \t <b>Разом: </b>${parseInt(item.price) * parseInt(item.count)};\n`)
    message += `<b>Сумма: </b>${summ}грн. \n`
    try {
        axios.post(URI_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        }).then(() => {
            dispatch(setUserAction('orderSuccessfull'));
            clearCart();
        })
    } catch (error) {
        console.log(error);
    }
}

export default cartReducer;