import { GET_USER, UPLOAD_PICTURE , PANIER_PRODUCT } from "../actions/user.actions";


const initialState = {};

export default function userReducer(state = initialState, action){
    switch (action.type){
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload
            }
            case PANIER_PRODUCT:
                
                        return {
                            ...state,
                            userPanier : [action.payload.productId , ...state.userPanier]
                        }
                    
                    
                

        default: return state;
    }
}