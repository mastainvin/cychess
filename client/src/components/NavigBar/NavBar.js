import React, { useState, useContext } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { UidContext } from "../Routes/AppContext";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";
import Logout from "../Log/Logout";
import { useSelector } from "react-redux";
import "./navbar.scss";
import icon from "./../../images/icon.png";
import login_icon from "./../../images/login.png";
const NavBar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar expand="md" light className="navbar">
                <div className="container">
                    <NavbarBrand href="/">
                        <img src={icon} className="icon" /> CY Chess
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle}></NavbarToggler>
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {uid ? (
                                <div className="welcome">
                                    <NavLink href="/profil">
                                        <h5>
                                            Bienvenue {userData.pseudonyme} !
                                        </h5>
                                    </NavLink>
                                </div>
                            ) : (
                                <NavLink href="/profil">
                                    <h5>Cliquez ici pour vous connecter !</h5>
                                </NavLink>
                            )}
                            <NavItem>
                                <NavLink
                                    href="/profil"
                                    className="navlink"
                                    activeClassName="active"
                                    tag={RRNavLink}
                                    to="/profil"
                                >
                                    Profil
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href=""
                                    className="navlink"
                                    activeClassName="active"
                                    tag={RRNavLink}
                                    to="/boutique"
                                >
                                    Boutique
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href=""
                                    className="navlink"
                                    activeClassName="active"
                                    tag={RRNavLink}
                                    to="/forum"
                                >
                                    Forum
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    href="/events"
                                    className="navlink"
                                    activeClassName="active"
                                    tag={RRNavLink}
                                    to="/events"
                                >
                                    Evénements
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                {uid ? (
                                    <Logout />
                                ) : (
                                    <div className="log_icon">
                                        <a href="/profil">
                                            <img
                                                src={login_icon}
                                                alt="login_icon"
                                                style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    margin: "5px 20px ",
                                                }}
                                            />
                                        </a>
                                    </div>
                                )}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </div>
    );
};

export default NavBar;
