import React from "react";
import { useDispatch } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { deleteEvent, getEvents } from "../../actions/event.actions";
const DeleteModal = ({ nom, idToDelete, isOpen, toggle, collapseToggle }) => {
    const dispatch = useDispatch();
    const handleDelete = async () => {
        await collapseToggle();
        await dispatch(deleteEvent(idToDelete));
        toggle();
        dispatch(getEvents());
    };
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Supprimer</ModalHeader>
            <ModalBody>Êtes-vous sûrs de supprimer {nom} ? </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={handleDelete}>
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
