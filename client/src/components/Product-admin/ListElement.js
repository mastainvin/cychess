import axios from "axios";
import React, { useEffect, useState } from "react";

import { Button, Table, ListGroupItem, Collapse } from "reactstrap";
import { dateParser } from "../Utils";
import collapseClose from "../../images/collapse-close.png";
import collapseOpen from "../../images/collapse-open.png";
import DeleteModal from "./DeleteModal";
import ModifyModal from "./ModifyModal";
import ModifyImgModal from "./ModifyImgModal";

const ListElement = ({ product }) => {
    const [details, setDetails] = useState(false);
    const [collapseImg, setCollapseImg] = useState(collapseClose);
    const [DeleteIsOpen, setDeleteIsOpen] = useState(false);
    const [ModifyIsOpen, setModifyIsOpen] = useState(false);
    const [ModifyImgIsOpen, setModifyImgIsOpen] = useState(false);

    const toggleDelete = () => setDeleteIsOpen(!DeleteIsOpen);
    const toggleModify = () => setModifyIsOpen(!ModifyIsOpen);
    const toggleModifyImg = () => setModifyImgIsOpen(!ModifyImgIsOpen);

    const toggle = () => {
        setDetails(!details);
        if (collapseImg === collapseClose) {
            setCollapseImg(collapseOpen);
        } else {
            setCollapseImg(collapseClose);
        }
    };

    return (
        <ListGroupItem className="event-list-item" key={product._id}>
            <div className="list-row">
                <div style={{ width: "30%" }}>
                    <h4
                        className="event-name"
                        onClick={toggle}
                        style={{ width: "max-content" }}
                    >
                        <img src={collapseImg} style={{ width: "1vw" }} />
                        {"   "}
                        {product.nom}
                    </h4>
                </div>

                <div className="event-list-component" style={{ width: "30%" }}>
                    <label htmlFor="participants">Nombre restant</label>
                    <h5 id="participants">{product.nb_restant}</h5>
                </div>
                <div className="event-list-component" style={{ width: "10%" }}>
                    <label htmlFor="event">Prix</label>
                    <h5 id="event">{product.prix} €</h5>
                </div>
            </div>
            <Collapse isOpen={details} className="collapse-event">
                <hr />
                <div className="event-infos">
                    <div style={{ width: "75%" }} className="event-left-infos">
                        <div>
                            <h5>Description</h5>
                            <p>{product.description}</p>
                        </div>
                    </div>
                    <div style={{ width: "20%" }}>
                        <img
                            src={product.productProfil}
                            style={{ maxWidth: "100%" }}
                        />
                    </div>
                </div>
                <div className="btn-footer">
                    <div>
                        <Button color="warning" onClick={toggleDelete}>
                            Supprimer
                        </Button>
                        <Button
                            color="secondary"
                            onClick={toggleModify}
                            style={{ marginLeft: "30px" }}
                        >
                            Modifier
                        </Button>
                    </div>

                    <Button color="secondary" onClick={toggleModifyImg}>
                        Changer l'image
                    </Button>
                </div>

                <DeleteModal
                    isOpen={DeleteIsOpen}
                    toggle={toggleDelete}
                    idToDelete={product._id}
                    nom={product.nom}
                    collapseToggle={toggle}
                />
                <ModifyModal
                    modal={ModifyIsOpen}
                    toggle={toggleModify}
                    product={product}
                />
                <ModifyImgModal
                    modal={ModifyImgIsOpen}
                    toggle={toggleModifyImg}
                    productId={product._id}
                    productName={product.nom}
                />
            </Collapse>
        </ListGroupItem>
    );
};

export default ListElement;
