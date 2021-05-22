import React, { useState } from "react";
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../actions/user.actions";
import UploadImg from "./UploadImg";
import { isEmpty } from "../Utils";
import "./profil.scss";

const Updateprofil = ({ userData }) => {
    const [bio, setBio] = useState(userData.bio);
    const [dateDeNaissance, setDateDeNaissance] = useState(
        userData.dateDeNaissance
    );
    const [sexe, setSexe] = useState(userData.sexe);
    const [prenom, setPrenom] = useState(userData.prenom);
    const [nom, setNom] = useState(userData.nom);
    const [residence, setResidence] = useState(userData.residence);
    const [roleEventuel, setRoleEventuel] = useState(userData.roleEventuel);
    const [updateForm, setUpdateForm] = useState(false);
    const dispatch = useDispatch();

    const handleUpdate = async () => {
        const data = {
            bio: bio,
            dateDeNaissance: dateDeNaissance,
            sexe: sexe,
            prenom: prenom,
            nom: nom,
            residence: residence,
            roleEventuel: roleEventuel,
        };

        await dispatch(updateUser(userData._id, data));
        dispatch(getUser(userData._id));
        setUpdateForm(false);
    };

    return (
        <div className="profil-container">
            <h2> Profil de {userData.pseudonyme}</h2>
            {userData.roleEventuel !== null && (
                <div className="role">Role : {userData.roleEventuel}</div>
            )}
            {userData.roleEventuel === null && (
                <div className="role">Role : admin</div>
            )}
            <div className="update-container">
                <div className="left-part">
                    <h4>Photo de profil</h4>
                    <img src={userData.userProfil} alt="user-pic" />
                    <UploadImg />
                </div>
                <div className="right-part">
                    <h3>Informations complémentaires :</h3>
                    {updateForm === false && (
                        <>
                            <p onClick={() => setUpdateForm(!updateForm)}>
                                Bio : 
                                <br />
                                {userData.bio}
                            </p>
                            <p onClick={() => setUpdateForm(!updateForm)}>
                                Date de naissance : 
                                <br />
                                {userData.dateDeNaissance}
                            </p>
                            <p onClick={() => setUpdateForm(!updateForm)}>
                                Genre : 
                                <br />
                                {userData.sexe}
                            </p>
                            <p onClick={() => setUpdateForm(!updateForm)}>
                                Prénom : 
                                <br />
                                {userData.prenom}
                            </p>
                            <p onClick={() => setUpdateForm(!updateForm)}>
                                Nom : 
                                <br />
                                {userData.nom}
                            </p>
                            <p onClick={() => setUpdateForm(!updateForm)}>
                                Adresse :
                                <br />
                                {userData.residence}
                            </p>
                            <Button className="custom-btn" onClick={() => setUpdateForm(!updateForm)}>
                                Modifier
                            </Button>
                        </>
                    )}
                    {updateForm && (
                        <>
                            <textarea
                                type="text"
                                defaultValue={userData.bio}
                                onChange={(e) => setBio(e.target.value)}
                            ></textarea>
                            <input
                                type="date"
                                name="born-date"
                                defaultValue={userData.dateDeNaissance}
                                onChange={(e) =>
                                    setDateDeNaissance(e.target.value)
                                }
                            />
                            <textarea
                                type="text"
                                defaultValue={userData.sexe}
                                onChange={(e) => setSexe(e.target.value)}
                            ></textarea>
                            <textarea
                                type="text"
                                defaultValue={userData.prenom} 
                                onChange={(e) => setPrenom(e.target.value)}
                            ></textarea>
                            <textarea
                                type="text"
                                defaultValue={userData.nom}
                                onChange={(e) => setNom(e.target.value)}
                            ></textarea>
                            <textarea
                                type="text"
                                defaultValue={userData.residence} 
                                onChange={(e) => setResidence(e.target.value)}
                            ></textarea>
                            <Button className="custom-btn" onClick={handleUpdate}>
                                Valider modifications
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Updateprofil;
