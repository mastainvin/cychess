import React from "react";
import fond from "./../images/fond.jpg";
import HeaderStyles from "./HeaderStyles.scss";
const HeaderImg = ({ title }) => {
    return (
        <div src={fond} className="header">
            <h2>{title}</h2>
        </div>
    );
};

export default HeaderImg;
