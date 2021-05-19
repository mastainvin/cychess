import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_DATEDENAISSANCE = "UPDATE_DATEDENAISSANCE";
export const UPDATE_SEXE = "UPDATE_SEXE";
export const UPDATE_PRENOM = "UPDATE_PRENOM";
export const UPDATE_NOM = "UPDATE_NOM";
export const UPDATE_RESIDENCE = "UPDATE_RESIDENCE";

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
                            payload: res.data.picture
                        });
                    });
            })
            .catch((err) => console.log(err));
    };
};

export const updateBio = (userId, bio) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: {bio}
        })
            .then((res) => {
                dispatch({ 
                    type: UPDATE_BIO,
                    payload: bio
                });
            })
            .catch((err) => console.log(err))
    };
};

export const updateDateDeNaissance = (userId, dateDeNaissance) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: {dateDeNaissance}
        })
            .then((res) => {
                dispatch({ 
                    type: UPDATE_DATEDENAISSANCE,
                    payload: dateDeNaissance
                });
            })
            .catch((err) => console.log(err));
    };
};

export const updateSexe = (userId, sexe) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: {sexe}
        })
            .then((res) => {
                dispatch({ 
                    type: UPDATE_SEXE,
                    payload: sexe
                });
            })
            .catch((err) => console.log(err));
    };
};

export const updatePrenom = (userId, prenom) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: {prenom}
        })
            .then((res) => {
                dispatch({ 
                    type: UPDATE_PRENOM,
                    payload: prenom
                });
            })
            .catch((err) => console.log(err));
    };
};

export const updateNom = (userId, nom) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: {nom}
        })
            .then((res) => {
                dispatch({ 
                    type: UPDATE_NOM,
                    payload: nom
                });
            })
            .catch((err) => console.log(err));
    };
};

export const updateResidence = (userId, residence) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: {residence}
        })
            .then((res) => {
                dispatch({ 
                    type: UPDATE_RESIDENCE,
                    payload: residence
                });
            })
            .catch((err) => console.log(err));
    };
};