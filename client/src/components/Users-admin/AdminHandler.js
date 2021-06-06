import React, { useState } from "react";
import { isAdmin } from "../Utils";
import { Form } from "reactstrap";
import { useDispatch } from "react-redux";
import { updateUser } from "../../actions/user.actions";
import { getUsers } from "../../actions/users.actions";
const AdminHandler = ({ user }) => {
    const [userIsAdmin, setUserIsAdmin] = useState(isAdmin(user));
    const dispatch = useDispatch();
    const changeStatus = async () => {
        const data = {
            bio: user.bio,
            dateDeNaissance: user.dateDeNaissance,
            sexe: user.sexe,
            prenom: user.prenom,
            nom: user.nom,
            residence: user.residence,
            role: user.role,
            admin: !userIsAdmin,
        };
        setUserIsAdmin(!userIsAdmin);

        await dispatch(updateUser(user._id, data));
        dispatch(getUsers());
    };

    return (
        <Form className="admin_handler">
            <div className="admin_handler_input">
                <input
                    id={"admin" + user._id}
                    type="radio"
                    name={"admin" + user._id}
                    value={true}
                    checked={userIsAdmin}
                    onChange={() => {
                        changeStatus();
                    }}
                />
                <label htmlFor={"admin" + user._id}>Admin</label>
            </div>
            <div className="admin_handler_input">
                <input
                    id={"member" + user._id}
                    type="radio"
                    name={"member" + user._id}
                    value={false}
                    checked={!userIsAdmin}
                    onChange={() => {
                        changeStatus();
                    }}
                />
                <label htmlFor={"member" + user._id}>Membre</label>
            </div>
        </Form>
    );
};

export default AdminHandler;
