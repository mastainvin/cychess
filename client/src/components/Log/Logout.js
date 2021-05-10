import React from "react";
import axios from "axios";
import cookie from "js-cookie";
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
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
        })
            .then(() => removeCookie("jwt"))
            .catch((err) => console.log(err));

        window.location = "/profil";
    };

    return (
        <div onClick={logout} className="log_icon">
            <img
                src={logout_icon}
                alt="logout_icon"
                style={{ width: "30px", margin: "5px 20px " }}
            />
        </div>
    );
};

export default Logout;
