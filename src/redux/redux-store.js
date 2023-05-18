import { combineReducers, legacy_createStore as createStore } from "redux";
import basketReducer from "./basket-reducer";


let reducers = combineReducers({
    basketReducer
})

let store = createStore(reducers)

window.store = store;

export default store;