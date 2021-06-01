import { GET_RECETTE } from "../actions/recette.actions";

const initialState = {};

export default function recetteReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECETTE:
            return action.payload;
        default:
            return state;
    }
}
