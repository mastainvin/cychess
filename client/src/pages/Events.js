import React, { useEffect, useState, useContext } from "react";
import { Alert } from "reactstrap";
import { UidContext } from "../components/Routes/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../actions/event.actions";
import Eventcard from "../components/Event/Card";
import { isEmpty } from "../components/Utils";
import Header from "../components/header";
import "./events.scss";

const Events = () => {
    const uid = useContext(UidContext);

    const [loadEvent, setLoadEvent] = useState(true);
    const dispatch = useDispatch();
    const events = useSelector((state) => state.eventReducer);
    const userData = useSelector((state) => state.userReducer);
    const notConnected = !uid;

    useEffect(() => {
        if (loadEvent) {
            dispatch(getEvents());
            setLoadEvent(false);
        }
    }, [loadEvent, dispatch]);

    return (
        <div className="events container">
            <Header title="Nos Evénements" />

            {notConnected ? (
                <Alert color="warning" style={{ width: "100%" }}>
                    Attention ! Vous ne pouvez pas vous inscrire à un événement
                    si vous n'êtes pas connecté.
                </Alert>
            ) : (
                <span></span>
            )}

            {!isEmpty(events[0]) &&
                events.map((event) => {
                    return <Eventcard event={event} key={event._id} />;
                })}
        </div>
    );
};

export default Events;
