import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";
import { Button } from "reactstrap";

const UploadImg = () => {
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = () => {
        const data = new FormData();
        data.append("name", userData.pseudonyme);
        data.append("userId", userData._id);
        data.append("file", file);

        dispatch(uploadPicture(data, userData._id));

    }

    return (
        <form action ="" onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file" className="change-img">Changer d'image</label>
            <input 
            type="file" 
            id="file" 
            name="file" 
            accept accept=".jpg, .jpeg, .png"
            onChange={(e) => setFile(e.target.files[0])}
            ></input>
            <br />
            <Button className="custom-btn" type="submit">Envoyer</Button>
        </form>
    );
};

export default UploadImg;
