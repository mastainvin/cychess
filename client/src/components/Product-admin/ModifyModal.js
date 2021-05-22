import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getProducts, modifyProduct } from "../../actions/product.actions";
import "./modal.scss";

const ModifyModal = ({ modal, toggle, product }) => {
    const [nom, setNom] = useState(product.nom);
    const [desc, setDesc] = useState(product.description);
    const [prix, setPrix] = useState(product.prix);
    const [nb_restant, setnbr_restant] = useState(product.nb_restant);

    const dispatch = useDispatch();
    const handleModifyEvent = async () => {
        const data = {
            nom: nom,
            description: desc,
            prix: prix,
            nb_restant: nb_restant,
        };

        await dispatch(modifyProduct(data, product._id));
        dispatch(getProducts());
        toggle();
    };

    return (
        <div>
            <Modal
                isOpen={modal}
                toggle={() => {
                    toggle();
                }}
            >
                <ModalHeader
                    toggle={() => {
                        toggle();
                    }}
                >
                    Modification du produit
                </ModalHeader>
                <ModalBody>
                    <form className="event-form">
                        <label htmlFor="nom">Nom de l'événement</label>
                        <input
                            type="text"
                            name="nom"
                            id="nom"
                            defaultValue={product.nom}
                            onChange={(e) => setNom(e.target.value)}
                        ></input>
                        <br />
                        <label htmlFor="desc">Description</label>
                        <textarea
                            type="text"
                            name="desc"
                            id="desc"
                            onChange={(e) => setDesc(e.target.value)}
                            defaultValue={product.description}
                        ></textarea>
                        <br />
                        <label htmlFor="restant">Nombre restant</label>
                        <input
                            type="number"
                            name="restant"
                            id="restant"
                            onChange={(e) => setnbr_restant(e.target.value)}
                            defaultValue={product.nb_restant}
                        ></input>
                        <br />
                        <label htmlFor="prix">Prix</label>
                        <input
                            type="number"
                            name="prix"
                            id="prix"
                            onChange={(e) => setPrix(e.target.value)}
                            defaultValue={product.prix}
                        ></input>
                        <br />
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={handleModifyEvent}>
                        Valider
                    </Button>{" "}
                    <Button
                        color="secondary"
                        onClick={() => {
                            toggle();
                        }}
                    >
                        Retour
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ModifyModal;
