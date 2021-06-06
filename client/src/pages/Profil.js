import React, { useContext, useEffect, useState } from "react";
import Log from "../components/Log";
import Updateprofil from "../components/Profil/UpdateProfil";
import { UidContext } from "../components/Routes/AppContext";
import HeaderImg from "../components/headerImg";
import Footer from "../components/Footer";
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
        <div className="content">
            {uid && <HeaderImg title="Profil" />}
            <div className="profil-page">
                {uid ? (
                    <>
                        {!userInLoad ? (
                            <>
                                <Updateprofil
                                    userData={userData}
                                    className="container"
                                />
                            </>
                        ) : (
                            <Spinner size="lg" color="success" />
                        )}
                    </>
                ) : (
                    <div className="log-container container">
                        <Log signin={false} signup={true} />
                    </div>
                )}
            </div>
            {uid && <Footer />}
        </div>
    );
};

export default Profil;
