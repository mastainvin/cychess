import React, { useContext, useEffect, useState } from "react";
import Log from "../components/Log";
import Updateprofil from "../components/Profil/UpdateProfil";
import { UidContext } from "../components/Routes/AppContext";
import Header from "../components/header";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../actions/user.actions";
import { Spinner } from "reactstrap";
import { isEmpty } from "../components/Utils";
const Profil = () => {
    const uid = useContext(UidContext);
    const [userInLoad, setUserInLoad] = useState(true);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);
    useEffect(async () => {
        if (userInLoad && !isEmpty(userData)) {
            setUserInLoad(false);
        }
    });
    return (
        <div className="profil-page container">
            {uid ? (
                <>
                    {!userInLoad ? (
                        <>
                            <Header title="Votre profil" />
                            <Updateprofil userData={userData} />
                        </>
                    ) : (
                        <Spinner size="lg" color="success" />
                    )}
                </>
            ) : (
                <div className="log-container">
                    <Log signin={false} signup={true} />
                </div>
            )}
        </div>
    );
};

export default Profil;
