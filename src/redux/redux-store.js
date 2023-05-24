import { combineReducers, legacy_createStore as createStore } from "redux";
import cartReducer from "./cart-reducer";
import userReducer from "./user-reducer";


let reducers = combineReducers({
    cartReducer,
    userReducer
})

let store = createStore(reducers)

window.store = store;

export default store;