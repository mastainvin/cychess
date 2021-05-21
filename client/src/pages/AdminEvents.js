import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { isAdmin, isEmpty } from "../components/Utils";
import { Redirect } from "react-router";
import Header from "../components/header";
import { getEvents } from "../actions/event.actions";
import { Button, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import "./event-admin.scss";
import EventModal from "../components/Event-admin/EventModal";
import ListElement from "../components/Event-admin/ListElement";

const AdminEvent = () => {
    const userData = useSelector((state) => state.userReducer);
    const notAdmin = !isAdmin(userData);
    const events = useSelector((state) => state.eventReducer);
    const [loadEvent, setLoadEvent] = useState(true);
    const dispatch = useDispatch();
    const [isUserAdmin, setIsUserAdmin] = useState(userData.admin);
    const [inLoad, setInLoad] = useState(true);
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (loadEvent) {
            dispatch(getEvents());
            setLoadEvent(false);
        }
        if (inLoad && !isEmpty(userData)) {
            setIsUserAdmin(userData.admin);
            setInLoad(false);
        }
    }, [userData, loadEvent, dispatch, events]);

    return (
        <div className="container">
            <EventModal toggle={toggle} modal={modal} />
            <Header title="Administration - Evénements" />
            {inLoad ? (
                <Spinner color="success" />
            ) : (
                <>
                    {!isUserAdmin ? (
                        <Redirect to="/" />
                    ) : (
                        <div>
                            <ListGroup className="event-list">
                                <ListGroupItem>
                                    <div className="list-row">
                                        <Button
                                            color="success"
                                            onClick={toggle}
                                        >
                                            Ajouter un événement !
                                        </Button>
                                    </div>
                                </ListGroupItem>
                                {!isEmpty(events) &&
                                    events.map((event) => (
                                        <ListElement
                                            event={event}
                                            key={event._id}
                                        />
                                    ))}
                            </ListGroup>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminEvent;
