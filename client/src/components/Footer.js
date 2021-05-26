import React from "react";
import Footer from "./Footer.scss";
import pion from "./../images/pion_blanc.png";
import facebook from "./../images/facebook.png";
import instagram from "./../images/instagram.png";
import twitter from "./../images/twitter.png";

const Header = ({ title }) => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="left-footer">
                    <img src={pion} className="pion_blanc" />
                    <p>&#xa9; CY Chess</p>
                </div>
                <div className="middle-footer">
                    <p>Nos réseaux </p>
                    <div className="medias">
                        <img className="media" src={facebook} />
                        <img className="media" src={instagram} />
                        <img className="media" src={twitter} />
                    </div>
                </div>
                <div className="right-footer">
                    <ul>
                        <li>
                            <a href="/profil" className="lien">
                                Profil
                            </a>
                        </li>
                        <li>
                            <a href="/shop" className="lien">
                                Boutique
                            </a>
                        </li>
                        <li>
                            <a href="/forum" className="lien">
                                Forum
                            </a>
                        </li>
                        <li>
                            <a href="/events" className="lien">
                                Evénements
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Header;
