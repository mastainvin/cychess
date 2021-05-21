import { GET_USER, UPDATE_USER, UPLOAD_PICTURE } from "../actions/user.actions";

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
        case UPDATE_USER:
            return state;
        // return {
        //     ...state,
        //     bio: action.payload.bio,
        //     dateDeNaissance: action.payload.dateDeNaissance,
        //     sexe: action.payload.sexe,
        //     prenom: action.payload.prenom,
        //     nom: action.payload.nom,
        //     residence: action.payload.residence,
        //     roleEventuel: action.payload.roleEventuel,
        // };

        default:
            return state;
    }
}
