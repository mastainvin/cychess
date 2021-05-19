import React, { useContext } from "react";
import Log from "../components/Log";
import Updateprofil from "../components/Profil/UpdateProfil";
import { UidContext } from "../components/Routes/AppContext";
import Header from "../components/header";
const Profil = () => {
    const uid = useContext(UidContext);

    return (
        <div className="profil-page container">
            {uid ? (
                <Updateprofil>
                    <Header title="Votre profil" />
                </Updateprofil>
            ) : (
                <div className="log-container">
                    <Log signin={false} signup={true} />
                </div>
            )}
        </div>
    );
};

export default Profil;
