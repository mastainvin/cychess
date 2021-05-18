import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../Routes/AppContext";

import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
} from "reactstrap";
import userReducer from "../../reducers/user.reducer";
import { dateParser, isEmpty, toDate } from "../Utils";
import card from "./card.scss";
import ParticipateHandler from "./ParticipateHandler";

const Eventcard = ({ event }) => {
    const uid = useContext(UidContext);
    const dataActuelle = new Date();

    const userData = useSelector((state) => state.userReducer);
    const canParticipate =
        uid &&
        dataActuelle.setHours(0, 0, 0, 0) <
            toDate(event.date).setHours(0, 0, 0, 0);

    return (
        <div className="eventCard">
            <Card className="Card">
                <CardImg
                    top
                    width="100%"
                    src={event.image}
                    alt="Card image cap"
                />
                <CardBody className="cardBody">
                    <CardTitle tag="h5">{event.nom}</CardTitle>
                    <hr />
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                        <span>Prix : </span>
                        {event.prix == 0 ? (
                            <span>Gratuit</span>
                        ) : (
                            <span>{event.prix} €</span>
                        )}
                    </CardSubtitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                        <span>Date : </span>
                        {dateParser(event.date)}
                    </CardSubtitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                        <span>Lieu : </span>
                        {event.lieu}
                    </CardSubtitle>
                    <hr />
                    <CardText className="eventCardText">
                        {event.description}
                    </CardText>
                    <ParticipateHandler
                        idToParticipate={event._id}
                        canParticipate={canParticipate}
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default Eventcard;
