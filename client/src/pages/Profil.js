import React, { useContext } from 'react';
import Log from '../components/Log';
import Updateprofil from '../components/Profil/UpdateProfil';
import { UidContext } from "../components/Routes/AppContext";
const Profil = () => {
    const uid = useContext(UidContext);

    return (
        <div className="profil-page">
            {uid ? (
                <Updateprofil></Updateprofil>
            ) : (
            <div className="log-container">
                <Log signin={false} signup={true} />
            </div>
            )}
        </div>
    );
};

export default Profil;