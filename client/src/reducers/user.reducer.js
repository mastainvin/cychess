import { GET_USER, UPDATE_BIO, UPDATE_SEXE, UPDATE_DATEDENAISSANCE, UPLOAD_PICTURE, UPDATE_PRENOM, UPDATE_NOM, UPDATE_RESIDENCE } from "../actions/user.actions";


const initialState = {};

export default function userReducer(state = initialState, action){
    switch (action.type){
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload
            };
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload
            };
        case UPDATE_DATEDENAISSANCE:
            return {
                ...state,
                dateDeNaissance: action.payload
            };
        case UPDATE_SEXE:
            return {
                ...state,
                sexe: action.payload
            };
        case UPDATE_PRENOM:
            return {
                ...state,
                prenom: action.payload
            };
        case UPDATE_NOM:
            return {
                ...state,
                nom: action.payload
            };
        case UPDATE_RESIDENCE:
            return {
                ...state,
                residence: action.payload
            };
        default: return state;
    }
}