import React from "react";
import Footer from "./Footer.scss";
import pion from "./../images/pion_blanc.png";
const Header = ({ title }) => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="left-footer">
                    <img src={pion} className="pion_blanc" />
                    <p>CY Chess</p>
                </div>
                <div className="right-footer">bonjour</div>
            </div>
        </footer>
    );
};

export default Header;
