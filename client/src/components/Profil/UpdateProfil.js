import React from "react";
import { useSelector } from "react-redux";
// import UploadImg from "./UploadImg";

const Updateprofil = () => {
    const userData = useSelector((state) => state.userReducer);

    return (
        <div className="profil-container">
            <h2> Profil de {userData.pseudonyme}</h2>
            <div className="update-container">
                <div className="left-part">
                    <h4>Photo de profil</h4>
                    authmiddleware changer regarder a 2:56:30
                    <img src={userData.userProfil} alt="user-pic" />
                    {/* <UploadImg /> */}
                </div>
            </div>
        </div>
    );
};

export default Updateprofil;
