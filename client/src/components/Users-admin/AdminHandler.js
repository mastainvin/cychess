import React from "react";
import { isAdmin } from "../Utils";
import { Button } from "reactstrap";

const AdminHandler = ({ user }) => {
    const userIsAdmin = isAdmin(user);

    const putAdminHandler = () => {};

    const putNotAdminHandler = () => {};

    return userIsAdmin ? (
        <Button color="warning" onClick={putNotAdminHandler}>
            Administrateur
        </Button>
    ) : (
        <Button color="secondary" onClick={putAdminHandler}>
            Utilisateur
        </Button>
    );
};

export default AdminHandler;
