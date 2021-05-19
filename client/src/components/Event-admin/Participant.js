import React from "react";
import { Table } from "reactstrap";

const Participant = ({ user }) => {
    return (
        <tr>
            <th scope="row">{user.nom}</th>
            <td>{user.prenom}</td>
            <td>{user.pseudonyme}</td>
            <td>{user.email}</td>
        </tr>
    );
};

export default Participant;
