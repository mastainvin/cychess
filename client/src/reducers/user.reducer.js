import {
<<<<<<< HEAD
    GET_USER,
    UPLOAD_PICTURE,
    PANIER_PRODUCT,
    PANIER_DELETE_PRODUCT,
=======
    DELETE_USER,
    UPDATE_USER,
    GET_USER,
    PARTICIPATE,
    UNPARTICIPATE,
    UPLOAD_PICTURE,
>>>>>>> master
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload,
            };
<<<<<<< HEAD
        case PANIER_PRODUCT:
            return {
                ...state,
                userPanier: [action.payload.productId, ...state.userPanier],
            };

        case PANIER_DELETE_PRODUCT:
            return {
                ...state,
                userPanier: state.userPanier.filter(
                    (val, index) => index !== action.payload.productKey
                ),
            };
=======

        case DELETE_USER:
            return state;
        case UPDATE_USER:
            return state;

        case PARTICIPATE:
            return {
                ...state,
                events: [action.payload.eventId, ...state.events],
            };
        case UNPARTICIPATE:
            return {
                ...state,
                events: state.events.filter(
                    (id) => id !== action.payload.eventId
                ),
            };

>>>>>>> master
        default:
            return state;
    }
}
