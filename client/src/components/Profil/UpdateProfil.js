import React, { useState } from "react";
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import {
    updateBio,
    updateDateDeNaissance,
    updateSexe,
    updatePrenom,
    updateNom,
    updateResidence
} from "../../actions/user.actions";
import UploadImg from "./UploadImg";

const Updateprofil = () => {
    const userData = useSelector((state) => state.userReducer);
    const [bio, setBio] = useState(userData.bio);
    const [dateDeNaissance, setDateDeNaissance] = useState(
        userData.dateDeNaissance
    );
    const [sexe, setSexe] = useState(userData.sexe);
    const [prenom, setPrenom] = useState(userData.prenom);
    const [nom, setNom] = useState(userData.nom);
    const [residence, setResidence] = useState(userData.residence);
    const [updateForm, setUpdateForm] = useState(false);
    const dispatch = useDispatch();

    const [bioChange, setBioChange] = useState(false);
    const [sexeChange, setSexeChange] = useState(false);

    const handleUpdate = () => {
            {bioChange === true && (
                dispatch(updateBio(userData._id, bio))
            )}
        // dispatch(updateDateDeNaissance(userData._id, dateDeNaissance));
        {sexeChange === true && (
            dispatch(updateSexe(userData._id, sexe))
        )}
        // dispatch(updatePrenom(userData._id, prenom));
        // dispatch(updateNom(userData._id, nom));
        // dispatch(updateResidence(userData._id, residence));
        setUpdateForm(false);
    };

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
                            <p onClick={() => setUpdateForm(!updateForm)}>
                                {userData.bio}
                            </p>
                            <Button onClick={() => setUpdateForm(!updateForm)}
                            >
                                Modifier
                            </Button>
                            <p onClick={() => setUpdateForm(!updateForm)}>
                                {userData.dateDeNaissance}
                            </p>
                            <p onClick={() => setUpdateForm(!updateForm)}>
                                {userData.sexe}
                            </p>
                            <p onClick={() => setUpdateForm(!updateForm)}>
                                {userData.prenom}
                            </p>
                            <p onClick={() => setUpdateForm(!updateForm)}>
                                {userData.nom}
                            </p>
                            <p onClick={() => setUpdateForm(!updateForm)}>
                                {userData.residence}
                            </p>
                            <Button onClick={() => setUpdateForm(!updateForm),
                                                   setSexeChange === !sexeChange}
                            >
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
                            <Button onClick={handleUpdate}>
                                Valider modifications
                            </Button>
                            {/* <input
                                type="date"
                                name="born-date"
                                defaultValue={userData.dateDeNaissance}
                                onChange={(e) =>
                                    setDateDeNaissance(e.target.value)
                                }
                            /> */}
                            <textarea
                                type="text"
                                defaultValue={userData.sexe} 
                                onChange={(e) => setSexe(e.target.value)}
                            ></textarea>
                            <Button onClick={handleUpdate, setSexeChange === !sexeChange}>
                                Valider modifications
                            </Button>
                            {/* <input
                                type="text"
                                defaultValue={userData.prenom} 
                                onChange={(e) => setPrenom(e.target.value)}
                            ></input>
                            <input
                                type="text"
                                defaultValue={userData.nom}
                                onChange={(e) => setNom(e.target.value)}
                            ></input>
                            <input
                                type="text"
                                defaultValue={userData.residence} 
                                onChange={(e) => setResidence(e.target.value)}
                            ></input>
                            <Button onClick={handleUpdate}>
                                Valider modifications
                            </Button> */}
                        </>
                    )}
                    {/* <h3>Informations supplémentaires</h3>
                    {updateBorn === false && (
                        <>
                            <p onClick={() => setUpdateBorn(!updateBorn)}>
                                {" "}
                                Date de naissance :{userData.dateDeNaissance}
                            </p>
                            <Button onClick={() => setUpdateBorn(!updateBorn)}>
                                Modifier date de naissance
                            </Button>
                        </>
                    )} */}
                    {/* {updateBorn && (
                        <>
                            <input
                                type="date"
                                name="born-date"
                                defaultValue={userData.dateDeNaissance}
                                onChange={(e) =>
                                    setDateDeNaissance(e.target.value)
                                }
                            />
                            <Button onClick={handleUpdate}>
                                Valider modifications
                            </Button>
                        </>
                    )}
                    {updateGenre === false && (
                        <>
                            <p onClick={() => setUpdateGenre(!updateGenre)}>Genre: {userData.sexe}</p>
                            <Button onClick={() => setUpdateGenre(!updateGenre)}>Modifier Genre</Button>
                        </>
                    )}
                    {updateGenre && (
                        <>
                            <input
                                type="text"
                                defaultValue={userData.sexe} 
                                onChange={(e) => setSexe(e.target.value)}
                            ></input>
                            <Button onClick={handleUpdate}>Valider modifications</Button>
                        </>
                    )}
                    {updateFirstName === false && (
                        <>
                            <p onClick={() => setUpdateFirstName(!updateFirstName)}>Prénom: {userData.prenom}</p>
                            <Button onClick={() => setUpdateFirstName(!updateFirstName)}>Modifier prénom</Button>
                        </>
                    )}
                    {updateFirstName && (
                        <>
                            <input
                                type="text"
                                defaultValue={userData.prenom} 
                                onChange={(e) => setPrenom(e.target.value)}
                            ></input>
                            <Button onClick={handleUpdate}>Valider modifications</Button>
                        </>
                    )}
                    {updateName === false && (
                        <>
                            <p onClick={() => setUpdateName(!updateName)}>Nom: {userData.nom}</p>
                            <Button onClick={() => setUpdateName(!updateName)}>Modifier nom</Button>
                        </>
                    )}
                    {updateName && (
                        <>
                            <input
                                type="text"
                                defaultValue={userData.nom}
                                onChange={(e) => setNom(e.target.value)}
                            ></input>
                            <Button onClick={handleUpdate}>Valider modifications</Button>
                        </>
                    )}
                    {updateAdresse === false && (
                        <>
                            <p onClick={() => setUpdateAdresse(!updateAdresse)}>Adresse: {userData.residence}</p>
                            <Button onClick={() => setUpdateAdresse(!updateAdresse)}>Modifier adresse</Button>
                        </>
                    )}
                    {updateAdresse && (
                        <>
                            <input
                                type="text"
                                defaultValue={userData.residence} 
                                onChange={(e) => setResidence(e.target.value)}
                            ></input>
                            <Button onClick={handleUpdate}>Valider modifications</Button>
                        </>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default Updateprofil;
