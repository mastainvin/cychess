import React, { useEffect, useState, useContext } from "react";
import { Alert } from "reactstrap";
import { UidContext } from "../components/Routes/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../actions/event.actions";
import Eventcard from "../components/Event/Card";
import { isEmpty } from "../components/Utils";
import HeaderImg from "../components/headerImg";
import Footer from "../components/Footer";
import "./events.scss";

const Events = () => {
    const uid = useContext(UidContext);

    const [loadEvent, setLoadEvent] = useState(true);
    const dispatch = useDispatch();
    const events = useSelector((state) => state.eventReducer);
    const [searchTerm, setSearchTerm] = useState("");
    const [inSearch, setInSearch] = useState(true);
    const userData = useSelector((state) => state.userReducer);
    const notConnected = !uid;
    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value);
        setInSearch(true);
    };

    useEffect(() => {
        if (loadEvent) {
            dispatch(getEvents());
            setLoadEvent(false);
        }
    }, [loadEvent, dispatch]);

    return (
        <div className="content">
            <HeaderImg title="Evénements" />

            <div className="container">
                <div className="searchBar-container">
                    <input
                        type="text"
                        name="searchBar"
                        id="searchBar"
                        onChange={handleSearchTerm}
                        placeholder="Rechercher"
                    />
                </div>

                <div className="events">
                    {notConnected ? (
                        <Alert color="warning" style={{ width: "100%" }}>
                            Attention ! Vous ne pouvez pas vous inscrire à un
                            événement si vous n'êtes pas connecté.
                        </Alert>
                    ) : (
                        <Alert
                            color="success"
                            style={{ width: "100%" }}
                            isOpen={visible}
                            toggle={onDismiss}
                        >
                            <h4>Informations</h4>
                            <ul>
                                <li>
                                    Si la participation à un événement est
                                    payante, le paiement se fera en mains
                                    propres le jour de l'événement.
                                </li>
                                <li>
                                    On peut s'inscrire jusqu'a 00:00 de la date
                                    d'un événement.
                                </li>
                            </ul>
                        </Alert>
                    )}

                    {!isEmpty(events[0]) &&
                        events
                            .filter((val) => {
                                return val.nom
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase());
                            })
                            .map((event) => {
                                return (
                                    <Eventcard event={event} key={event._id} />
                                );
                            })}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Events;
