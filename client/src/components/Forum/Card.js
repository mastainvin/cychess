import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../Utils";
import randomUserImg from "../../images/randomUserImg.jpg";
import messageImg from "../../images/message1.svg";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";
import { updatePost } from "../../actions/post.actions";
import { Collapse, Badge } from "reactstrap";

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const [showComments, setShowComments] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [viewProfil, setViewProfil] = useState(false);

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post._id, textUpdate));
        }
        setIsUpdated(false);
    };

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);
    return (
        <li className="card-container" key={post._id}>
            <div className="card-left">
                <img
                    onClick={ () => setViewProfil(!viewProfil) }
                    src={
                        !isEmpty(usersData[0]) &&
                        usersData
                            .map((user) => {
                                if (user._id === post.posterId)
                                    if (user.userProfil) {
                                        return user.userProfil;
                                    } else return randomUserImg;
                            })
                            .join("")
                    }
                    alt="poster-pic"
                />
            </div>

            <div className="card-right">
                <div className="card-header">
                    <div className="pseudo">
                        <h2>
                            {!isEmpty(usersData[0]) &&
                                usersData
                                    .map((user) => {
                                        if (user._id === post.posterId)
                                            return user.pseudonyme;
                                        else return null;
                                    })
                                    .join("")}
                        </h2>
                        <Badge className="role" color="secondary">
                            {!isEmpty(usersData[0]) &&
                                usersData
                                    .map((user) => {
                                        if (user._id === post.posterId)
                                            return user.role;
                                        else return null;
                                    })
                                    .join("")}
                        </Badge>
                    </div>

                    <span>{dateParser(post.createdAt)}</span>
                </div>

                <h5>
                    {!isEmpty(usersData[0]) &&
                        usersData
                            .map((user) => {
                                if (user._id === post.posterId)
                                    return post.title;
                            })
                            .join("")}
                </h5>

                {!isEmpty(usersData[0]) &&
                    usersData
                        .map((user) => {
                            if (user._id === post.posterId) return post.message;
                        })
                        .join("")}

                <div>
                    {userData._id === post.posterId && (
                        <div className="button-container">
                            <DeleteCard id={post._id} />
                        </div>
                    )}
                </div>

                <div className="card-footer">
                    <div className="comment-icon">
                        <img
                            onClick={
                                (() => setShowComments(!showComments), toggle)
                            }
                            src={messageImg}
                            alt="comment"
                        />
                        <span>{post.comments.length}</span>
                    </div>
                </div>
                <Collapse isOpen={isOpen}>
                    <CardComments post={post} />
                </Collapse>
                {viewProfil && 
                    usersData
                    .map((user) => {
                        if (user._id === post.posterId)
                            return(
                                <div className="visitProfil">
                                    <ul>
                                        <li><img className="visitImage" src={user.userProfil} /></li>
                                        <td>
                                        <li className="inf">{user.pseudonyme} </li>
                                        <li className="inf">{user.bio}</li>
                                        </td>
                                    </ul>
                                </div>
                            );
                    })
                }
            </div>
        </li>
    );
};

export default Card;
