import axios from "axios";

//posts
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";

// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

//error
export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const getPosts = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`)
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const addPost = (data) => {
    return (dispatch) => {
      return axios
        .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
        .then((res) => {
          if (res.data.errors) {
            dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
          } else {
            dispatch({ type: GET_POST_ERRORS, payload: "" });
          }
        });
    };
  };
  
  export const deletePost = (postId) => {
    return (dispatch) => {
      return axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      })
        .then((res) => {
          dispatch({ type: DELETE_POST, payload: { postId } });
        })
        .catch((err) => console.log(err));
    };
  };
  
  export const addComment = (postId, commenterId, text, commenterPseudo) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
        data: { commenterId, text, commenterPseudo },
      })
        .then((res) => {
          dispatch({ type: ADD_COMMENT, payload: { postId } });
        })
        .catch((err) => console.log(err));
    };
  };
  
  export const editComment = (postId, commentId, text) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/post/edit-comment/${postId}`,
        data: { commentId, text },
      })
        .then((res) => {
          dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
        })
        .catch((err) => console.log(err));
    };
  };
  
  export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/post/delete-comment/${postId}`,
        data: { commentId },
      })
        .then((res) => {
          dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
        })
        .catch((err) => console.log(err));
    };
  };
  
  export const updatePost = (postId, message) => {
    return (dispatch) => {
      return axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
        data: { message },
      })
        .then((res) => {
          dispatch({ type: UPDATE_POST, payload: { message, postId } });
        })
        .catch((err) => console.log(err));
    };
  };