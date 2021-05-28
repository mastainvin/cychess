import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {  addOrder, getOrders } from "../../actions/order.actions";
import "./modal.scss";

const OrderModal = ({ modal, toggle }) => {
    const [nom, setNom] = useState("");
    const [status, setstatus] = useState("");
    const [prix, setPrix] = useState(10);
    const [nb_taken, setnb_taken] = useState(20);
    
    const dispatch = useDispatch();

    const handleNewEvent = async (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append("nom", nom);
        data.append("status", status);
        data.append("prix", prix);
        data.append("nb_taken", nb_taken);
        

        await dispatch(addOrder(data));
        dispatch(getOrders());
        
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
                    Nouvelle Commande
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
                        <label htmlFor="status">Status</label>
                        <textarea
                            type="text"
                            name="status"
                            id="status"
                            onChange={(e) => setstatus(e.target.value)}
                            value={status}
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
                            Nombre de produits pris
                        </label>
                        <input
                            type="number"
                            name="maxParticipants"
                            id="maxParticipants"
                            onChange={(e) => setnb_taken(e.target.value)}
                            value={nb_taken}
                            required
                        ></input>
                        <br />
                       
                    </ModalBody>
                    
                </form>
            </Modal>
        </div>
    );
    


    
};

export default OrderModal;
