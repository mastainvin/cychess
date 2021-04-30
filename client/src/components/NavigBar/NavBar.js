import React, { useState, useContext } from "react";
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

const NavBar = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.useRecuder);

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">CY Chess</NavbarBrand>
                <NavbarToggler onClick={toggle}></NavbarToggler>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/Profil">Profil</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="">Boutique</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="">Forum</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/events">Evénements</NavLink>
                        </NavItem>
                        {uid ? (
                            <ul>
                                <li></li>
                                <li className="welcome">
                                    <NavLink href="/Profil">
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
            </Navbar>
        </div>
    );
};

export default NavBar;
