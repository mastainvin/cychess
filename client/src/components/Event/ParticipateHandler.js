import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { Button } from "reactstrap";
import { unparticipate, participate } from "./../../actions/user.actions";

import "./card.scss";

const ParticipateHandler = ({ idToParticipate, notConnected }) => {
    const userData = useSelector((state) => state.userReducer);
    const [participated, setParticipated] = useState(false);
    const dispatch = useDispatch();

    const handlePartipation = () => {
        dispatch(participate(userData._id, idToParticipate));
        setParticipated(true);
    };

    const handleUnPartipation = () => {
        dispatch(unparticipate(userData._id, idToParticipate));
        setParticipated(false);
    };

    useEffect(() => {
        if (!isEmpty(userData.events)) {
            if (userData.events.includes(idToParticipate))
                setParticipated(true);
            else setParticipated(false);
        }
    }, [userData, idToParticipate]);

    return participated ? (
        <Button
            color="secondary"
            onClick={handleUnPartipation}
            className="eventButton"
            disabled={notConnected}
        >
            Se désinscrire
        </Button>
    ) : (
        <Button
            color="success"
            onClick={handlePartipation}
            className="eventButton"
            disabled={notConnected}
        >
            S'inscrire
        </Button>
    );
};

export default ParticipateHandler;
