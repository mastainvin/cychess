import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import eventReducer from "./event.reducer";
import productReducer from "./product.reducer";
import postReducer from './post.reducer';
import recetteReducer from './recette.reducer';



export default combineReducers({
    userReducer,
    usersReducer,
    eventReducer,
    productReducer,
    postReducer,
    recetteReducer,
});
