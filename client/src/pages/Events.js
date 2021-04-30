import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getEvents } from "../actions/event.actions";

const Events = () => {
    const [loadEvent, setLoadEvent] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (loadEvent) {
            dispatch(getEvents());
            setLoadEvent(false);
        }
    }, [loadEvent, dispatch]);

    return <div className="events">Bonjour</div>;
};

export default Events;
