import { combineReducers } from "redux";
import useReducer from "./user.reducer";
import eventReducer from "./event.reducer";
export default combineReducers({
    useReducer,
    eventReducer,
});
