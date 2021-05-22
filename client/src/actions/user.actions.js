import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const PARTICIPATE = "PARTICIPATE";
export const UNPARTICIPATE = "UNPARTICIPATE";

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => {
                dispatch({
                    type: GET_USER,
                    payload: res.data,
                });
            })
            .catch((err) => console.log(err));
    };
};

export const uploadPicture = (data, id) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                    .then((res) => {
                        dispatch({
                            type: UPLOAD_PICTURE,
                            payload: res.data.picture,
                        });
                    });
            })
            .catch((err) => console.log(err));
    };
};

export const participate = (userId, eventId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/event/participate/${eventId}`,
            data: { id: userId },
        })
            .then((res) => {
                dispatch({ type: PARTICIPATE, payload: { eventId } });
            })
            .catch((err) => console.log(err));
    };
};

export const unparticipate = (userId, eventId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/event/unparticipate/${eventId}`,
            data: { id: userId },
        })
            .then((res) => {
                dispatch({ type: UNPARTICIPATE, payload: { eventId } });
            })
            .catch((err) => console.log(err));
    };
};
