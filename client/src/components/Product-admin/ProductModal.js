import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { addProduct, getProducts } from "../../actions/product.actions";
import "./modal.scss";

const ProductModal = ({ modal, toggle }) => {
    const [nom, setNom] = useState("");
    const [desc, setDesc] = useState("");
    const [prix, setPrix] = useState(10);
    const [nb_restant, setnb_restant] = useState(20);
    const [image, setImage] = useState(null);
    
    const dispatch = useDispatch();
    
    
    


    const handleNewEvent = async (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append("nom", nom);
        data.append("description", desc);
        data.append("prix", prix);
        data.append("nb_restant", nb_restant);
        data.append("file", image);
    
        await dispatch(addProduct(data));
        dispatch(getProducts());
        clearForm();
        toggle();
    };

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };

    const clearForm = () => {
        setNom("");
        setDesc("");
        setPrix(20);
        setnb_restant(20);
        setImage(null);
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
                    Nouveau produit
                </ModalHeader>
                <form onSubmit={handleNewEvent}>
                    <ModalBody className="event-form">
                        <label htmlFor="nom">Nom du produit</label>
                        <input
                            type="text"
                            name="nom"
                            id="nom"
                            onChange={(e) => setNom(e.target.value)}
                            value={nom}
                            required
                        ></input>
                        <br />
                        <label htmlFor="desc">Description</label>
                        <textarea
                            type="text"
                            name="desc"
                            id="desc"
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                            required
                        ></textarea>
                        <br />
                        <label htmlFor="prix">Prix</label>
                        <input
                            type="number"
                            name="prix"
                            id="prix"
                            onChange={(e) => setPrix(e.target.value)}
                            value={prix}
                            required
                        ></input>
                        <br />
                        <label htmlFor="maxParticipants">
                            Nombre de produits disponibles
                        </label>
                        <input
                            type="number"
                            name="maxParticipants"
                            id="maxParticipants"
                            onChange={(e) => setnb_restant(e.target.value)}
                            value={nb_restant}
                            required
                        ></input>
                        <br />
                        <label htmlFor="image">Image</label>
                        <input
                            id="image"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => handleImage(e)}
                            required
                        />
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

export default ProductModal;
