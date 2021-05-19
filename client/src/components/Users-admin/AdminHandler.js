import React from "react";
import { isAdmin } from "../Utils";
import { Button } from "reactstrap";

const AdminHandler = ({ user }) => {
    const userIsAdmin = isAdmin(user);

    const putAdminHandler = () => {
        const data = new FormData();
        data.append("pseudonyme", user.pseudonyme);
    };

    const putMemberHandler = () => {};

    return userIsAdmin ? (
        <Button color="warning" onClick={putMemberHandler}>
            Admin
        </Button>
    ) : (
        <Button color="secondary" onClick={putAdminHandler}>
            Membre
        </Button>
    );
};

export default AdminHandler;
