import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import { NavLink } from "reactstrap";
import logout_icon from "../../images/logout.png";
import "./log.scss";
const Logout = () => {
    const removeCookie = (key) => {
        if (window !== "undifined") {
            cookie.remove(key, { expires: 1 });
        }
    };

    const logout = async () => {
        await axios({
            method: "get",
            url: `/api/user/logout`,
            withCredentials: true,
        })
            .then(() => removeCookie("jwt"))
            .catch((err) => console.log(err));

        window.location = "/profil";
    };

    return (
        <NavLink onClick={logout} className="welcome">
            <h5>Déconnexion</h5>
        </NavLink>
    );
};

export default Logout;
