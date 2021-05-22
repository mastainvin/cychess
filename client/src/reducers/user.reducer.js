import {
    GET_USER,
    UPDATE_USER,
    PARTICIPATE,
    UNPARTICIPATE,
    UPLOAD_PICTURE,
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
        default:
            return state;
    }
}
