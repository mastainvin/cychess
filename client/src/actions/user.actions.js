import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";

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

export const deleteUser = (id) => {
    return (dispatch) => {
        return axios
            .delete(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
                dispatch({ type: DELETE_USER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const updateUser = (userId, data) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: data,
        })
            .then((res) => {
                dispatch({
                    type: UPDATE_USER,
                    payload: data,
                });
            })
            .catch((err) => console.log(err));
    };
};
