import {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    GET_PRODUCTS,
    MODIFY_PRODUCT,
    MODIFY_IMG_PRODUCT,
  
} from "../actions/product.actions";

const initialState = {};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.payload;
        case ADD_PRODUCT:
            return state;
        case DELETE_PRODUCT:
            return state;
        case MODIFY_PRODUCT:
            return state;
       
        case MODIFY_IMG_PRODUCT:
            return state;
        default:
            return state;
    }
}
