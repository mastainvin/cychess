import axios from "axios";
import React, { useEffect, useState } from "react";

import { Button, Table, ListGroupItem, Collapse } from "reactstrap";
import Participant from "./Participant";
import { dateParser } from "../Utils";
import collapseClose from "../../images/collapse-close.png";
import collapseOpen from "../../images/collapse-open.png";
import DeleteModal from "./DeleteModal";
import ModifyModal from "./ModifyModal";
import ModifyImgModal from "./ModifyImgModal";

const ListElement = ({ event }) => {
    const [details, setDetails] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [collapseImg, setCollapseImg] = useState(collapseClose);
    const [DeleteIsOpen, setDeleteIsOpen] = useState(false);
    const [ModifyIsOpen, setModifyIsOpen] = useState(false);
    const [ModifyImgIsOpen, setModifyImgIsOpen] = useState(false);

    const toggleDelete = () => setDeleteIsOpen(!DeleteIsOpen);
    const toggleModify = () => setModifyIsOpen(!ModifyIsOpen);
    const toggleModifyImg = () => setModifyImgIsOpen(!ModifyImgIsOpen);

    useEffect(async () => {
        const response = [];
        const fetchUser = (id) => {
            axios
                .get(`/api/user/${id}`)
                .then((res) => {
                    response.push(res.data);
                })
                .catch((err) => console.log(err));
        };
        for (let i = 0; i < event.participants.length; i++) {
            const participantId = event.participants[i];
            fetchUser(participantId);
        }
        await setParticipants(response);
    }, [event]);

    const toggle = () => {
        setDetails(!details);
        if (collapseImg === collapseClose) {
            setCollapseImg(collapseOpen);
        } else {
            setCollapseImg(collapseClose);
        }
    };

    return (
        <ListGroupItem className="event-list-item" key={event._id}>
            <div className="list-row">
                <div style={{ width: "30%" }}>
                    <h4
                        className="event-name"
                        onClick={toggle}
                        style={{ width: "max-content" }}
                    >
                        <img src={collapseImg} style={{ width: "1vw" }} />
                        {"   "}
                        {event.nom}
                    </h4>
                </div>

                <div className="event-list-component" style={{ width: "30%" }}>
                    <label htmlFor="date">Date</label>
                    <h5 id="date">{dateParser(event.date)}</h5>
                </div>
                <div className="event-list-component" style={{ width: "30%" }}>
                    <label htmlFor="participants">Participants</label>
                    <h5 id="participants">
                        {event.participants.length} / {event.maxParticipants}
                    </h5>
                </div>
                <div className="event-list-component" style={{ width: "10%" }}>
                    <label htmlFor="event">Prix</label>
                    <h5 id="event">
                        {event.prix > 0 && <span>{event.prix} €</span>}
                        {event.prix == 0 && <span>gratuit</span>}
                    </h5>
                </div>
            </div>
            <Collapse isOpen={details} className="collapse-event">
                <hr />
                <div className="event-infos">
                    <div style={{ width: "75%" }} className="event-left-infos">
                        <div>
                            <h5>Description</h5>
                            <p>{event.description}</p>
                        </div>
                        <div className="tableau-participants">
                            <h5>Liste des participants</h5>
                            <Table style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <td>Nom</td>
                                        <td>Prénom</td>
                                        <td>Pseudo</td>
                                        <td>Adresse mail</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {participants.map((user) => {
                                        return (
                                            <Participant
                                                user={user}
                                                key={user._id}
                                            />
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div style={{ width: "20%" }}>
                        <img src={event.image} style={{ maxWidth: "100%" }} />
                    </div>
                </div>
                <div className="btn-footer">
                    <div>
                        <Button color="warning" onClick={toggleDelete}>
                            Supprimer
                        </Button>
                        <Button
                            color="secondary"
                            onClick={toggleModify}
                            style={{ marginLeft: "30px" }}
                        >
                            Modifier
                        </Button>
                    </div>

                    <Button color="secondary" onClick={toggleModifyImg}>
                        Changer l'image
                    </Button>
                </div>

                <DeleteModal
                    isOpen={DeleteIsOpen}
                    toggle={toggleDelete}
                    idToDelete={event._id}
                    nom={event.nom}
                    collapseToggle={toggle}
                />
                <ModifyModal
                    modal={ModifyIsOpen}
                    toggle={toggleModify}
                    event={event}
                />
                <ModifyImgModal
                    modal={ModifyImgIsOpen}
                    toggle={toggleModifyImg}
                    eventId={event._id}
                    eventName={event.nom}
                />
            </Collapse>
        </ListGroupItem>
    );
};

export default ListElement;
