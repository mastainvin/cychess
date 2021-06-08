import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.actions";
import { Badge } from "reactstrap";

const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    // const error = useSelector((state) => state.errorReducer.postError);
    const dispatch = useDispatch();

    const handlePost = async () => {
        if (message && title) {
            const data = {
                posterId: userData._id,
                title: title,
                message: message,
            };

            await dispatch(addPost(data));
            dispatch(getPosts());
            cancelPost();
        } else {
            alert("Veuillez entrer un titre et un message");
        }
    };

    const cancelPost = () => {
        setTitle("");
        setMessage("");
    };

    return (
        <div className="post-container">
            <NavLink exact to="/profil">
                <div className="user-info">
                    <img src={userData.userProfil} alt="user-img" />
                </div>
            </NavLink>
            <div className="post-form">
                <textarea
                    className="title"
                    name="title"
                    id="title"
                    placeholder="Votre titre"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <textarea
                    name="message"
                    id="message"
                    placeholder="Posez votre question à la communauté !"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                {message || title ? (
                    <li className="card-container">
                        <div className="card-left">
                            <img src={userData.userProfil} alt="user-pic" />
                        </div>
                        <div className="card-right">
                            <div className="card-header">
                                <div className="pseudo">
                                    <h3>{userData.pseudonyme}</h3>
                                    <Badge className="role" color="secondary">
                                        {userData.role}
                                    </Badge>
                                </div>
                                <span>{timestampParser(Date.now())}</span>
                            </div>
                            <div className="post-content">
                                <h5>
                                    <p>{title}</p>
                                </h5>
                                <p>{message}</p>
                            </div>
                        </div>
                    </li>
                ) : null}
                <div className="footer-form">
                    <div className="btn-send">
                        {message || title ? (
                            <button className="cancel" onClick={cancelPost}>
                                Annuler message
                            </button>
                        ) : null}
                        <button className="send" onClick={handlePost}>
                            Envoyer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPostForm;
