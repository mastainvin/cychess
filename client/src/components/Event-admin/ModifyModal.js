import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getEvents, modifyEvent } from "../../actions/event.actions";
import "./modal.scss";

const ModifyModal = ({ modal, toggle, event }) => {
    const [nom, setNom] = useState(event.nom);
    const [desc, setDesc] = useState(event.description);
    const [date, setDate] = useState(event.date.substr(0, 10));
    const [prix, setPrix] = useState(event.prix);
    const [maxParticipants, setmaxParticipants] = useState(
        event.maxParticipants
    );
    const dispatch = useDispatch();
    const handleModifyEvent = async () => {
        const data = {
            nom: nom,
            description: desc,
            date: date,
            prix: prix,
            maxParticipants: maxParticipants,
        };

        await dispatch(modifyEvent(data, event._id));
        dispatch(getEvents());
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
                    Nouvel événement
                </ModalHeader>
                <ModalBody>
                    <form className="event-form">
                        <label htmlFor="nom">Nom de l'événement</label>
                        <input
                            type="text"
                            name="nom"
                            id="nom"
                            defaultValue={event.nom}
                            onChange={(e) => setNom(e.target.value)}
                        ></input>
                        <br />
                        <label htmlFor="desc">Description</label>
                        <textarea
                            type="text"
                            name="desc"
                            id="desc"
                            onChange={(e) => setDesc(e.target.value)}
                            defaultValue={event.description}
                        ></textarea>
                        <br />
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            onChange={(e) => setDate(e.target.value)}
                            defaultValue={event.date.substr(0, 10)}
                        ></input>
                        <br />
                        <label htmlFor="prix">Prix</label>
                        <input
                            type="number"
                            name="prix"
                            id="prix"
                            onChange={(e) => setPrix(e.target.value)}
                            defaultValue={event.prix}
                        ></input>
                        <br />

                        <label htmlFor="maxParticipants">
                            Nombre de participants
                        </label>
                        <input
                            type="number"
                            name="maxParticipants"
                            id="maxParticipants"
                            onChange={(e) => setmaxParticipants(e.target.value)}
                            defaultValue={event.maxParticipants}
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
