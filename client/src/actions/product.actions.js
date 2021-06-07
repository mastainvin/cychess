import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const MODIFY_PRODUCT = "MODIFY_PRODUCT";
export const MODIFY_IMG_PRODUCT = "MODIFY_IMG_PRODUCT";

export const getProducts = () => {
    return (dispatch) => {
        return axios
            .get(`/api/product/`)
            .then((res) => {
                dispatch({ type: GET_PRODUCTS, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const addProduct = (data) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `/api/product/`,
            data: data,
        })
            .then((res) => {
                dispatch({ type: ADD_PRODUCT });
            })
            .catch((err) => console.log(err));
    };
};

export const deleteProduct = (id) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `/api/product/${id}`,
        })
            .then((res) => {
                dispatch({ type: DELETE_PRODUCT, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const modifyProduct = (data, id) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `/api/product/${id}`,
            data: data,
        })
            .then((res) => {
                dispatch({ type: MODIFY_PRODUCT, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const modifyImgProduct = (data) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `/api/product/upload/`,
            data: data,
        })
            .then((res) => {
                dispatch({ type: MODIFY_IMG_PRODUCT, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};
