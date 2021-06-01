import React, { useEffect, useState } from "react";

import { ListGroupItem, Collapse } from "reactstrap";
import collapseClose from "../../images/collapse-close.png";
import collapseOpen from "../../images/collapse-open.png";

const ListElementDepenses = ({ depense }) => {
    const [details, setDetails] = useState(false);

    const [collapseImg, setCollapseImg] = useState(collapseClose);

    const toggle = () => {
        setDetails(!details);
        if (collapseImg === collapseClose) {
            setCollapseImg(collapseOpen);
        } else {
            setCollapseImg(collapseClose);
        }
    };

    return (
        <ListGroupItem className="event-list-item" key={depense._id}>
            <div className="list-row">
                <div style={{ width: "30%" }}>
                    <h4
                        className="event-name"
                        onClick={toggle}
                        style={{ width: "max-content" }}
                    >
                        <img src={collapseImg} style={{ width: "1vw" }} />
                        {"   "}
                        {depense.description}
                    </h4>
                </div>

                <div className="event-list-component" style={{ width: "10%" }}>
                    <label htmlFor="depense">Montant</label>
                    <h5 id="depense">{<span>{depense.montant} €</span>}</h5>
                </div>
            </div>
            <Collapse isOpen={details} className="collapse-event">
                <hr />
                <div className="event-infos">
                    <div style={{ width: "100%" }}>
                        <div>
                            <h5>Description</h5>
                            <p>{depense.description}</p>
                        </div>
                    </div>
                </div>
            </Collapse>
        </ListGroupItem>
    );
};

export default ListElementDepenses;
