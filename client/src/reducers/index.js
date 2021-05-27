import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import eventReducer from "./event.reducer";
import productReducer from "./product.reducer";

export default combineReducers({
    userReducer,
    eventReducer,
    productReducer,
});
