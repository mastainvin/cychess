import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const PANIER_PRODUCT = "PANIER_PRODUCT";

export const VALID_PANIER = "VALID_PANIER";
export const PANIER_DELETE_PRODUCT = "PANIER_DELETE_PRODUCT";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const PARTICIPATE = "PARTICIPATE";
export const UNPARTICIPATE = "UNPARTICIPATE";

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`/api/user/${uid}`)
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
            .post(`/api/user/upload`, data)
            .then((res) => {
                return axios.get(`/api/user/${id}`).then((res) => {
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
            url: `/api/user/${userId}`,
            data: { produitPanier: productId },
        }).then((res) => {
            dispatch({ type: PANIER_PRODUCT, payload: { productId } });
        });
    };
};
export const deleteUser = (id) => {
    return (dispatch) => {
        return axios
            .delete(`/api/user/${id}`)
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
            url: `/api/user/` + userId,
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
            url: `/api/event/participate/${eventId}`,
            data: { id: userId },
        })
            .then((res) => {
                dispatch({ type: PARTICIPATE, payload: { eventId } });
            })
            .catch((err) => console.log(err));
    };
};

export const ValiderPanier = (data) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `/api/recette/achat`,
            data: data,
        })
            .then((res) => {
                dispatch({ type: VALID_PANIER });
            })
            .catch((err) => console.log(err));
    };
};

export const EnleverPanier = (productKey, userId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `/api/user/deleteCartItem/${userId}`,
            data: { productKey: productKey },
        }).then((res) => {
            dispatch({
                type: PANIER_DELETE_PRODUCT,
                payload: { productKey },
            });
        });
    };
};
export const unparticipate = (userId, eventId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `/api/event/unparticipate/${eventId}`,
            data: { id: userId },
        })
            .then((res) => {
                dispatch({ type: UNPARTICIPATE, payload: { eventId } });
            })
            .catch((err) => console.log(err));
    };
};
