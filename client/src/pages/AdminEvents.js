import React from "react";
import { useSelector } from "react-redux";
import { isAdmin } from "../components/Utils";
import { Redirect } from "react-router";
import Header from "../components/header";

const AdminEvent = () => {
    const userData = useSelector((state) => state.userReducer);
    const notAdmin = !isAdmin(userData);

    return (
        <div className="container">
            <Header title="Administration - Evénements" />
            {notAdmin ? (
                <Redirect to="/" />
            ) : (
                <div>{/* -----------	Mettre la page ici --------- */}</div>
            )}
        </div>
    );
};

export default AdminEvent;
