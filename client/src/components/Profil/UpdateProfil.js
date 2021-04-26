import React from 'react';
import { useSelector } from 'react-redux';
import UploadImg from './UploadImg';

const Updateprofil = () => {
    const userData = useSelector((state) => state.userReducer)

    return (
        <div className="profil-container">
            <h1> Profil de {userData.pseudo}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    authmiddleware changer regarder a 2:56:30
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg />
                </div>
            </div>
        </div>
    );
};

export default Updateprofil;