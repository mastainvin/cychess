import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { addDepense, getRecette } from "../../actions/recette.actions";
import "./modal.scss";

const DepenseModal = ({ modal, toggle, userId }) => {
    const [desc, setDesc] = useState("");
    const [montant, setMontant] = useState(0);
    const dispatch = useDispatch();

    const handleNewDepense = async (event) => {
        event.preventDefault();

        const data = {
            type: "DEPENSE",
            description: desc,
            montant: montant,
            userId,
        };

        await dispatch(addDepense(data));
        dispatch(getRecette());
        clearForm();
        toggle();
    };

    const clearForm = () => {
        setDesc("");
        setMontant(0);
    };
    return (
        <div>
            <Modal
                isOpen={modal}
                toggle={() => {
                    toggle();
                    clearForm();
                }}
            >
                <ModalHeader
                    toggle={() => {
                        toggle();
                        clearForm();
                    }}
                >
                    Nouvel dépense
                </ModalHeader>
                <form onSubmit={handleNewDepense}>
                    <ModalBody className="event-form">
                        <label htmlFor="nom">Description de la dépense</label>
                        <input
                            type="text"
                            name="nom"
                            id="nom"
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                            required
                        ></input>
                        <br />
                        <label htmlFor="prix">Montant</label>
                        <input
                            type="number"
                            name="montant"
                            id="montant"
                            onChange={(e) => setMontant(e.target.value)}
                            value={montant}
                            required
                        ></input>
                        <br />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" type="submit">
                            Ajouter
                        </Button>{" "}
                        <Button
                            color="secondary"
                            onClick={() => {
                                toggle();
                                clearForm();
                            }}
                        >
                            Retour
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
};

export default DepenseModal;
