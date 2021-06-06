import React, { useState } from "react";
import AdminHandler from "./AdminHandler";
import { Button, ListGroupItem } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../actions/user.actions";
import { getUsers } from "../../actions/users.actions";
import DeleteModal from "./DeleteModal";
import RoleHandler from "./RoleHandler";

const ListElement = ({ user }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <>
            <tr className="user-row">
                <td>
                    {user.nom ? (
                        <>{user.nom}</>
                    ) : (
                        <span className="italic">Pas de nom</span>
                    )}
                </td>
                <td>
                    {user.prenom ? (
                        <>{user.prenom}</>
                    ) : (
                        <span className="italic">Pas de prénom</span>
                    )}
                </td>
                <td>
                    {user.email ? (
                        <>{user.email}</>
                    ) : (
                        <span className="italic">Pas d'email</span>
                    )}
                </td>
                <td>
                    <RoleHandler user={user} />
                </td>
                <td>
                    <AdminHandler user={user} />
                </td>
                <td>
                    <Button
                        color="danger"
                        onClick={toggle}
                        style={{ marginLeft: "20px" }}
                    >
                        Supprimer
                    </Button>
                </td>

                {/* <div className="user-row">
                <div className="user-infos">
                    <div className="user-info">
                        <label>Nom</label>
                        <h4>{user.nom}</h4>
                    </div>
                    <div className="user-info">
                        <label>Prénom</label>
                        <h4>{user.prenom}</h4>
                    </div>
                    <div className="user-info">
                        <label>Email</label>
                        <h4>{user.email}</h4>
                    </div>
                </div>
                <div className="user-info">
                    <label>Rôle</label>
                    <RoleHandler user={user} />
                </div>
                <div className="user-info">
                    <label>Statut</label>
                    <AdminHandler user={user} />
                </div>
                <div className="users-btn">
                    <Button
                        color="danger"
                        onClick={toggle}
                        style={{ marginLeft: "20px" }}
                    >
                        Supprimer
                    </Button>
                </div>
            </div>
            <DeleteModal modal={modal} toggle={toggle} user={user} /> */}
            </tr>
            <DeleteModal modal={modal} toggle={toggle} user={user} />
        </>
    );
};

export default ListElement;
