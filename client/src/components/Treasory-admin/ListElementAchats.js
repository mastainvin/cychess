import axios from "axios";
import React, { useEffect, useState } from "react";

import { Table, ListGroupItem, Collapse } from "reactstrap";
import { dateParser, isEmpty } from "../Utils";
import collapseClose from "../../images/collapse-close.png";
import collapseOpen from "../../images/collapse-open.png";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/product.actions";
import { getUsers } from "../../actions/users.actions";
const ListElementAchats = ({ achat }) => {
    const [details, setDetails] = useState(false);

    const [buyer, setBuyer] = useState("");
    const [inLoad, setInLoad] = useState(true);
    const dispatch = useDispatch();
    const [loadProduct, setLoadProduct] = useState(true);
    const products = useSelector((state) => state.productReducer);

    const [loadUsers, setLoadUsers] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);

    const [productsSells, setProductsSells] = useState([]);
    const [collapseImg, setCollapseImg] = useState(collapseClose);

    useEffect(async () => {
        const getBuyer = () => {
            usersData.map((user) => {
                if (user._id == achat.userId) setBuyer(user.pseudonyme);
            });
        };
        const getProductsSells = () => {
            let products_temp = [];
            achat.products.map((item) => {
                if (!isEmpty(products)) {
                    products.map((product) => {
                        if (product._id == item) {
                            products_temp.push(product);
                        }
                    });
                }
            });
            setProductsSells(products_temp);
        };

        if (loadProduct) {
            dispatch(getProducts());
            setLoadProduct(false);
        } else {
            getProductsSells();
        }

        if (loadUsers) {
            dispatch(getUsers());
            setLoadUsers(false);
        } else {
            getBuyer();
        }
    }, [achat, inLoad, products, loadProduct, usersData, loadUsers]);

    const toggle = () => {
        setDetails(!details);
        if (collapseImg === collapseClose) {
            setCollapseImg(collapseOpen);
        } else {
            setCollapseImg(collapseClose);
        }
    };

    return (
        <ListGroupItem className="event-list-item" key={achat._id}>
            <div className="list-row">
                <div style={{ width: "30%" }}>
                    <h4
                        className="event-name"
                        onClick={toggle}
                        style={{ width: "max-content" }}
                    >
                        <img src={collapseImg} style={{ width: "1vw" }} />
                        {"   "}
                        {buyer}
                    </h4>
                </div>

                <div className="event-list-component">
                    <label htmlFor="montant">Nombre de produits achetés</label>
                    <h5 id="montant">{achat.products.length}</h5>
                </div>
                <div className="event-list-component">
                    <label htmlFor="montant">Montant</label>
                    <h5 id="montant">{achat.montant} €</h5>
                </div>
            </div>
            <Collapse isOpen={details} className="collapse-event">
                <hr />
                <div className="event-infos">
                    <div className="event-left-infos">
                        <div className="tableau-participants">
                            <h5>Liste des produits achetés</h5>
                            <Table>
                                <thead>
                                    <tr>
                                        <td></td>
                                        <td>Nom</td>
                                        <td>Prix</td>
                                        <td>Nombre restant</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!isEmpty(productsSells) &&
                                        productsSells.map((product) => {
                                            return (
                                                <tr>
                                                    <th scope="row">
                                                        <img
                                                            src={
                                                                product.productProfil
                                                            }
                                                            style={{
                                                                height: "50px",
                                                                width: "auto",
                                                            }}
                                                        />
                                                    </th>
                                                    <td>{product.nom}</td>
                                                    <td>{product.prix} €</td>
                                                    <td>
                                                        {product.nb_restant}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </Collapse>
        </ListGroupItem>
    );
};

export default ListElementAchats;
