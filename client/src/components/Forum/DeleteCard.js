import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";
import poubelle from "../../images/poubelle.png";
import "./card.scss";

const DeleteCard = (props) => {
    const dispatch = useDispatch();

    const deleteQuote = () => dispatch(deletePost(props.id));

    return (
        <div
            onClick={() => {
                if (window.confirm("Voulez-vous supprimer cet article ?")) {
                    deleteQuote();
                }
            }}
        >
        <img src={poubelle} alt="trash" />
      </div>
    );
};

export default DeleteCard;