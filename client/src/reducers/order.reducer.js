import {
    ADD_ORDER,
    DELETE_ORDER,
    GET_ORDERS,
    
} from "../actions/order.actions";

const initialState = {};

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return action.payload;
            
        case ADD_PRODUCT:
            return state;
        
        case DELETE_ORDER:
            return state;
        
        default:
            return state;
    }
}
