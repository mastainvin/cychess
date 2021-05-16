import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import eventReducer from "./event.reducer";
import usersReducer from "./users.reducer";
export default combineReducers({
    userReducer,
    eventReducer,
    usersReducer,
});
