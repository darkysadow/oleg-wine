import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import cartReducer from "./cart-reducer";
import userReducer from "./user-reducer";
import adminReducer from "./admin-reducer";
import goodsReducer from "./goods-reducer";
import authReducer from "./auth-reducer";
import thunk from "redux-thunk";

let reducers = combineReducers({
    cartReducer,
    userReducer,
    adminReducer,
    goodsReducer,
    authReducer
})

let store = createStore(reducers, applyMiddleware(thunk))

window.store = store;

export default store;