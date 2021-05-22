import React from "react";
import { useDispatch } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { deleteProduct, getProducts } from "../../actions/product.actions";
const DeleteModal = ({ nom, idToDelete, isOpen, toggle, collapseToggle }) => {
    const dispatch = useDispatch();
    const handleDelete = async () => {
        await collapseToggle();
        await dispatch(deleteProduct(idToDelete));
        toggle();
        dispatch(getProducts());
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
