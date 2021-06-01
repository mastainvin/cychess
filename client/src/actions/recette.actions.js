import axios from "axios";

export const GET_RECETTE = "GET_RECETTE";
export const ADD_DEPENSE = "ADD_DEPENSE";
export const getRecette = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/recette`)
            .then((res) => {
                dispatch({ type: GET_RECETTE, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const addDepense = (data) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/recette/depense`,
            data: data,
        })
            .then((res) => {
                dispatch({ type: ADD_DEPENSE, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};
