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
import { navbar } from "./navbar.scss";
import icon from "./../../images/icon.png";
const NavBar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.useRecuder);

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
                            {uid ? (
                                <ul>
                                    <li></li>
                                    <li className="welcome">
                                        <NavLink href="/profil">
                                            <h5>Bienvenue {userData.pseudo}</h5>
                                        </NavLink>
                                    </li>
                                    <Logout />
                                </ul>
                            ) : (
                                <ul>
                                    <li></li>
                                    <li>
                                        <NavLink href="/Profil"></NavLink>
                                    </li>
                                </ul>
                            )}
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </div>
    );
};

export default NavBar;
