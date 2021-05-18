import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_DATEDENAISSANCE = "UPDATE_DATEDENAISSANCE";
export const UPDATE_GENRE = "UPDATE_GENRE";

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

export const updateGenre = (userId, genre) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: {genre}
        })
            .then((res) => {
                dispatch({ 
                    type: UPDATE_GENRE,
                    payload: genre
                });
            })
            .catch((err) => console.log(err));
    };
};