import { combineReducers, legacy_createStore as createStore } from "redux";
import cartReducer from "./cart-reducer";


let reducers = combineReducers({
    cartReducer
})

let store = createStore(reducers)

window.store = store;

export default store;