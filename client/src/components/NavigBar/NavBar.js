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
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import Logout from "../Log/Logout";
import { useSelector } from "react-redux";
import "./navbar.scss";
import icon from "./../../images/icon.png";
import login_icon from "./../../images/login.png";
import { isAdmin } from "./../Utils";

const NavBar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);
    const userAdmin = isAdmin(userData);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [adminDropdownOpen, setDropdownOpen] = useState(false);
    const droptownAdminToggle = () => setDropdownOpen(!adminDropdownOpen);

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
                                <Logout />
                            ) : (
                                <NavLink href="/profil">
                                    <h5>Connexion</h5>
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
                                    href="/shop"
                                    className="navlink"
                                    activeClassName="active"
                                    tag={RRNavLink}
                                    to="/shop"
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
                                    Ev??nements
                                </NavLink>
                            </NavItem>
                            {userAdmin ? (
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle caret color="white">
                                        Admin
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem header>
                                            Gestion de l'administration
                                        </DropdownItem>
                                        <DropdownItem divider />

                                        <DropdownItem
                                            href="/treasury-admin"
                                            tag={RRNavLink}
                                            to="/treasury-admin"
                                            className="admin-link"
                                        >
                                            Dashboard
                                        </DropdownItem>
                                        <DropdownItem divider />

                                        <DropdownItem
                                            href="/shop-admin"
                                            tag={RRNavLink}
                                            to="/shop-admin"
                                            className="admin-link"
                                        >
                                            Boutique
                                        </DropdownItem>
                                        <DropdownItem
                                            href="/events-admin"
                                            tag={RRNavLink}
                                            to="/events-admin"
                                            className="admin-link"
                                        >
                                            Ev??nements
                                        </DropdownItem>
                                        <DropdownItem
                                            href="/users-admin"
                                            tag={RRNavLink}
                                            to="/users-admin"
                                            className="admin-link"
                                        >
                                            Utilisateurs
                                        </DropdownItem>
                                        <DropdownItem
                                            href="/Orders-admin"
                                            tag={RRNavLink}
                                            to="/Orders-admin"
                                            className="admin-link"
                                        >
                                            Tr??sorerie
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            ) : (
                                <NavItem></NavItem>
                            )}
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </div>
    );
};

export default NavBar;
