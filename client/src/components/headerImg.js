import React from "react";
import fond from "./../images/fond.jpg";
import fond2 from "./../images/fond2.jpeg";
import fond3 from "./../images/fond3.jpeg";
import fond4 from "./../images/fond4.jpeg";
import fond5 from "./../images/fond5.jpeg";

import HeaderStyles from "./HeaderStyles.scss";
const HeaderImg = ({ title }) => {
    const fonds = [fond, fond2, fond3, fond4, fond5];
    const selected_background = fonds[Math.floor(Math.random() * 5)];
    console.log(fond);
    return (
        <div
            className="header"
            style={{
                backgroundImage: `url(${selected_background})`,
            }}
        >
            <h2>{title}</h2>
        </div>
    );
};

export default HeaderImg;
