import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../actions/user.actions";
import { getUsers } from "../../actions/users.actions";
const RoleHandler = ({ user }) => {
    const [userRole, setuserRole] = useState(user.role);
    const dispatch = useDispatch();
    const changeRole = async (e) => {
        const data = {
            bio: user.bio,
            dateDeNaissance: user.dateDeNaissance,
            sexe: user.sexe,
            prenom: user.prenom,
            nom: user.nom,
            residence: user.residence,
            role: e.target.value,
            admin: user.admin,
        };
        setuserRole(e.target.value);
        await dispatch(updateUser(user._id, data));
        dispatch(getUsers());
    };

    const options = [
        {
            label: "Membre",
            value: "Membre",
        },
        {
            label: "Président",
            value: "Président",
        },
        {
            label: "Vice-président",
            value: "Vice-président",
        },
        {
            label: "Trésorerier",
            value: "Trésorerier",
        },
        {
            label: "Secrétaire",
            value: "Secrétaire",
        },
    ];
    return (
        <select value={userRole} onChange={changeRole}>
            {options.map((option) => (
                <option value={option.value} key={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default RoleHandler;
