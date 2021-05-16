import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { addEvent, getEvents } from "../../actions/event.actions";
import "./modal.scss";

const EventModal = ({ modal, toggle }) => {
    const [nom, setNom] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [prix, setPrix] = useState(0);
    const [maxParticipants, setmaxParticipants] = useState(40);
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();

    const handleNewEvent = async (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append("nom", nom);
        data.append("description", desc);
        data.append("date", date);
        data.append("prix", prix);
        data.append("maxParticipants", maxParticipants);
        data.append("file", image);

        await dispatch(addEvent(data));
        dispatch(getEvents());
        clearForm();
        toggle();
    };

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };

    const clearForm = () => {
        setNom("");
        setDesc("");
        setDate("null");
        setPrix(0);
        setmaxParticipants(40);
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
                    Nouvel événement
                </ModalHeader>
                <form onSubmit={handleNewEvent}>
                    <ModalBody className="event-form">
                        <label htmlFor="nom">Nom de l'événement</label>
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
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            required
                        ></input>
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
                            Nombre de participants
                        </label>
                        <input
                            type="number"
                            name="maxParticipants"
                            id="maxParticipants"
                            onChange={(e) => setmaxParticipants(e.target.value)}
                            value={maxParticipants}
                            required
                        ></input>
                        <br />

                        <label htmlFor="image">Affiche</label>
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

export default EventModal;
