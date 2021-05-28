import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const PANIER_PRODUCT = "PANIER_PRODUCT";
export const PANIER_DELETE_PRODUCT = "PANIER_DELETE_PRODUCT";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";
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

export const AjoutPanier = (productId, userId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
            data: { produitPanier: productId },
        })
            .then((res) => {
                dispatch({ type: PANIER_PRODUCT, payload: { productId } });

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

<<<<<<< HEAD
export const EnleverPanier = (productKey, userId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/user/deleteCartItem/${userId}`,
            data: { productKey: productKey },
        })
            .then((res) => {
                dispatch({
                    type: PANIER_DELETE_PRODUCT,
                    payload: { productKey },
                });
=======
export const unparticipate = (userId, eventId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/event/unparticipate/${eventId}`,
            data: { id: userId },
        })
            .then((res) => {
                dispatch({ type: UNPARTICIPATE, payload: { eventId } });
>>>>>>> master
            })
            .catch((err) => console.log(err));
    };
};
<<<<<<< HEAD
=======

>>>>>>> master
