import axios from "axios";

export const GET_ORDERS = "GET_ORDERS";
export const ADD_ORDER = "ADD_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";

export const getOrders = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/order/`)
            .then((res) => {
                dispatch({ type: GET_ORDERS, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const addOrder = (data) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/order/`,
            data: data,
        })
            .then((res) => {
                dispatch({ type: ADD_ORDER });
            })
            .catch((err) => console.log(err));
    };
};

export const deleteOrder = (id) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/order/${id}`,
        })
            .then((res) => {
                dispatch({ type: DELETE_ORDER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

