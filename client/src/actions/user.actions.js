import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const PANIER_PRODUCT = "PANIER_PRODUCT";
export const VALID_PANIER = "VALID_PANIER";


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

export const AjoutPanier = ( productId , userId ) => {
    return (dispatch) => {
        return axios({
            method : 'patch',
            url : `${process.env.REACT_APP_API_URL}api/user/${userId}` ,
            data : { produitPanier : productId}

        })
         
         .then((res) =>{
             dispatch({type : PANIER_PRODUCT , payload : {productId}});
         })
         .catch ((err) => console.log(err));
    }
    
}

export const ValiderPanier = ( userPanier , userId ) => {
    return (dispatch) => {
        return axios({
            method : 'patch',
            url : `${process.env.REACT_APP_API_URL}api/user/${userId}` ,
            data : { validerPanier : userPanier}

        })
         
         .then((res) =>{
             dispatch({type : VALID_PANIER , payload : {userPanier}});
         })
         .catch ((err) => console.log(err));
    }
    
}

