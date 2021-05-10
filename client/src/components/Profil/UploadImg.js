import e from "express";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = () => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", userData.pseudonyme);
        data.append("userId", userData._id);
        data.append("file", file);
        dispatch(uploadPicture(data, userData._id));
    };

    return (
        <form action="" onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file">Changer d'image</label>
            <input
                type="file"
                id="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setFile(e.target.files[0])}
            ></input>
            <br />
            <input type="submit" vlue="Envoyer"></input>
        </form>
    );
};

export default UploadImg;
