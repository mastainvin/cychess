import React from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteUser } from "../../actions/user.actions";
import { getUsers } from "../../actions/users.actions";
const DeleteModal = ({ modal, toggle, user }) => {
    const dispatch = useDispatch();

    const deleteUserHandler = async () => {
        await dispatch(deleteUser(user._id));
        dispatch(getUsers());
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Supprimer un utilisateur</ModalHeader>
            <ModalBody>
                Êtes-vous sûrs de supprimer {user.nom} {user.prenom} ?
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={deleteUserHandler}>
                    Supprimer
                </Button>{" "}
                <Button color="secondary" onClick={toggle}>
                    Retour
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default DeleteModal;
