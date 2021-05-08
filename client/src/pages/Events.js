import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../actions/event.actions";
import eventReducer from "../reducers/event.reducer";
import Eventcard from "../components/Event/Card";
import { isEmpty } from "../components/Utils";
import { events } from "./events.scss";
const Events = () => {
    const [loadEvent, setLoadEvent] = useState(true);
    const dispatch = useDispatch();
    const events = useSelector((state) => state.eventReducer);
    useEffect(() => {
        if (loadEvent) {
            dispatch(getEvents());
            setLoadEvent(false);
        }
    }, [loadEvent, dispatch]);
    return (
        <div className="events">
            {!isEmpty(events[0]) &&
                events.map((event) => {
                    return <Eventcard event={event} key={event._id} />;
                })}
        </div>
    );
};

export default Events;
