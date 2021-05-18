import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio, updateDateDeNaissance, updateGenre } from "../../actions/user.actions";
import UploadImg from "./UploadImg";

const Updateprofil = () => {
    const [bio, setBio] = useState(userData.bio);
    const [dateDeNaissance, setDateDeNaissance] = useState(userData.bio);
    const [genre, setGenre] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const [updateBorn, setUpdateBorn] = useState(false);
    const [updateSex, setUpdateSex] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false);
        
    }

    const handleUpdateBorn = () => {
        dispatch(updateDateDeNaissance(userData._id, dateDeNaissance));
        setUpdateBorn(false);
    }

    const handleUpdateSex = () => {
        dispatch(updateGenre._id, genre);
        setUpdateSex(false);
    }

    return (
        <div className="profil-container">
            <h2> Profil de {userData.pseudonyme}</h2>
            <div className="update-container">
                <div className="left-part">
                    <h4>Photo de profil</h4>
                    <img src={userData.userProfil} alt="user-pic" />
                    <UploadImg />
                </div>
                <div className="right-part">
                    <h3>Bio</h3>
                    {updateForm === false && (
                        <>
                            <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                            <button onClick={() => setUpdateForm(!updateForm)}>Modifier bio</button>
                        </>
                    )}
                    {updateForm && (
                        <>
                            <textarea
                                type="text"
                                defaultValue={userData.bio} 
                                onChange={(e) => setBio(e.target.value)}
                            ></textarea>
                            <button onClick={handleUpdate}>Valider modifications</button>
                        </>
                    )}
                    <h3>Informations supplémentaires</h3>
                    {updateBorn === false && (
                        <>
                            <p onClick={() => setUpdateBorn(!updateBorn)}> Date de naissance :{userData.dateDeNaissance}</p>
                            <button onClick={() => setUpdateBorn(!updateBorn)}>Modifier date de naissance</button>
                        </>
                    )}
                    {updateBorn && (
                        <>
                            <input
                                type="date" 
                                name="born-date"
                                defaultValue={userData.dateDeNaissance}
                                onChange={(e) => setDateDeNaissance(e.target.value)}
                            />
                            <button onClick={handleUpdateBorn}>Valider modifications</button>
                        </>
                    )}
                    {/* <p>Genre </p>
                    {updateSex === false && (
                        <>
                            <p onClick={() => setUpdateSex(!updateSex)}>{userData.born}</p>
                            <button onClick={() => setUpdateSex(!updateSex)}>Modifier Genre</button>
                        </>
                    )}
                    {updateSex && (
                        <>
                            <input
                                type="text"
                                defaultValue={userData.genre} 
                                onChange={(e) => setGenre(e.target.value)}
                            ></input>
                            <button onClick={handleUpdate}>Valider modifications</button>
                        </>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default Updateprofil;
