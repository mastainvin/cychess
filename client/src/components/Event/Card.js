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
import { isEmpty } from "../Utils";
import card from "./card.scss";
import ParticipateHandler from "./ParticipateHandler";

const Eventcard = ({ event }) => {
    const uid = useContext(UidContext);

    const [isLoading, setIsLoading] = useState(false); // TODO Mettre à true lorsqu'il y aura le usersData de créé
    const userData = useSelector((state) => state.userReducer);
    const notConnected = !uid;

    return (
        <div className="eventCard">
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <Card className="Card">
                    <CardImg
                        top
                        width="100%"
                        src={event.image}
                        alt="Card image cap"
                    />
                    <CardBody className="cardBody">
                        <CardTitle tag="h5">{event.nom}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                            {event.prix}€
                        </CardSubtitle>
                        <CardText className="eventCardText">
                            {event.description}
                        </CardText>
                        <ParticipateHandler
                            idToParticipate={event._id}
                            notConnected={notConnected}
                        />
                    </CardBody>
                </Card>
            )}
        </div>
    );
};

export default Eventcard;
