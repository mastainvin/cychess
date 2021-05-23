import axios from "axios";
import React, { useEffect, useState } from "react";

import { Button, Table, ListGroupItem, Collapse } from "reactstrap";
import { dateParser } from "../Utils";
import collapseClose from "../../images/collapse-close.png";
import collapseOpen from "../../images/collapse-open.png";
import DeleteModal from "./DeleteModal";


const ListElement = ({ order }) => {
    const [details, setDetails] = useState(false);
    const [collapseImg, setCollapseImg] = useState(collapseClose);
    const [DeleteIsOpen, setDeleteIsOpen] = useState(false);
    

    const toggleDelete = () => setDeleteIsOpen(!DeleteIsOpen);
    

    const toggle = () => {
        setDetails(!details);
        if (collapseImg === collapseClose) {
            setCollapseImg(collapseOpen);
        } else {
            setCollapseImg(collapseClose);
        }
    };

    return (
        <ListGroupItem className="event-list-item" key={order._id}>
            <div className="list-row">
                <div style={{ width: "30%" }}>
                    <h4
                        className="event-name"
                        onClick={toggle}
                        style={{ width: "max-content" }}
                    >
                        <img src={collapseImg} style={{ width: "1vw" }} />
                        {"   "}
                        {order.nom}
                    </h4>
                </div>

                <div className="event-list-component" style={{ width: "30%" }}>
                    <label htmlFor="participants">Nombre pris</label>
                    <h5 id="participants">{order.nb_taken}</h5>
                </div>
                <div className="event-list-component" style={{ width: "10%" }}>
                    <label htmlFor="event">Prix</label>
                    <h5 id="event">{order.prix} €</h5>
                </div>

                <div className="event-list-component" style={{ width: "10%" }}>
                    <label htmlFor="event">Status</label>
                    <h5 id="event">{order.status} €</h5>
                </div>

                <div className="event-list-component" style={{ width: "10%" }}>
                    <label htmlFor="event">Action</label>
                    <h5 id="event">{order.action} €</h5>
                    <div className="btn-footer">
                    <div>
                        <Button color="warning" onClick={toggleDelete}>
                            Supprimer
                        </Button>
                        
                    </div>

                
                </div>

                <DeleteModal
                    isOpen={DeleteIsOpen}
                    toggle={toggleDelete}
                    idToDelete={order._id}
                    nom={order.nom}
                    collapseToggle={toggle}
                />
                </div>



            </div>
            
        </ListGroupItem>
    );
};

export default ListElement;
