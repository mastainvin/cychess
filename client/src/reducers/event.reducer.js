import {
    ADD_EVENT,
    DELETE_EVENT,
    GET_EVENTS,
    MODIFY_EVENT,
    MODIFY_IMG_EVENT,
} from "../actions/event.actions";

const initialState = {};

export default function eventReducer(state = initialState, action) {
    switch (action.type) {
        case GET_EVENTS:
            return action.payload;
        case ADD_EVENT:
            return state;
        case DELETE_EVENT:
            return state;
        case MODIFY_EVENT:
            return state;
        case MODIFY_IMG_EVENT:
            return state;
        default:
            return state;
    }
}
