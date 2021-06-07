import axios from "axios";

export const GET_EVENTS = "GET_EVENTS";
export const ADD_EVENT = "ADD_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
export const MODIFY_EVENT = "MODIFY_EVENT";
export const MODIFY_IMG_EVENT = "MODIFY_IMG_EVENT";

export const getEvents = () => {
    return (dispatch) => {
        return axios
            .get(`/api/event/`)
            .then((res) => {
                dispatch({ type: GET_EVENTS, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const addEvent = (data) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `/api/event/`,
            data: data,
        })
            .then((res) => {
                dispatch({ type: ADD_EVENT });
            })
            .catch((err) => console.log(err));
    };
};

export const deleteEvent = (id) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `/api/event/${id}`,
        })
            .then((res) => {
                dispatch({ type: DELETE_EVENT, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const modifyEvent = (data, id) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `/api/event/${id}`,
            data: data,
        })
            .then((res) => {
                dispatch({ type: MODIFY_EVENT, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const modifyImgEvent = (data) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `/api/event/upload/`,
            data: data,
        })
            .then((res) => {
                dispatch({ type: MODIFY_IMG_EVENT, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};
