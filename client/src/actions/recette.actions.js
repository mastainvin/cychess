import axios from "axios";

export const GET_RECETTE = "GET_RECETTE";

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

