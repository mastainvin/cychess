import React, { useState } from "react";
import AdminHandler from "./AdminHandler";
import { Button, ListGroupItem } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../actions/user.actions";
import { getUsers } from "../../actions/users.actions";
import DeleteModal from "./DeleteModal";

const ListElement = ({ user }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <ListGroupItem>
            <div className="user-row">
                <div className="user-infos">
                    <div className="user-info" style={{ width: "20%" }}>
                        <label>Nom</label>
                        <h4>{user.nom}</h4>
                    </div>
                    <div className="user-info" style={{ width: "20%" }}>
                        <label>Prénom</label>
                        <h4>{user.prenom}</h4>
                    </div>
                    <div className="user-info" style={{ width: "25%" }}>
                        <label>Email</label>
                        <h4>{user.email}</h4>
                    </div>
                </div>
                <div className="users-btn">
                    <AdminHandler user={user} />
                    <Button
                        color="danger"
                        onClick={toggle}
                        style={{ marginLeft: "20px" }}
                    >
                        Supprimer
                    </Button>
                </div>
            </div>
            <DeleteModal modal={modal} toggle={toggle} user={user} />
        </ListGroupItem>
    );
};

export default ListElement;
