import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { isAdmin, isEmpty } from "../components/Utils";
import { Redirect } from "react-router";
import Header from "../components/header";
import { getRecette } from "../actions/recette.actions";
import { Button, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import "./event-admin.scss";
import "./order-admin.scss";

import DepenseModal from "../components/Treasory-admin/DepenseModal";
import ListElementDepenses from "../components/Treasory-admin/ListElementDepenses";
import ListElementAchats from "../components/Treasory-admin/ListElementAchats";

const AdminOrders = () => {
    const userData = useSelector((state) => state.userReducer);
    const recettes = useSelector((state) => state.recetteReducer);
    const [loadRecette, setLoadRecette] = useState(true);
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    const [isUserAdmin, setIsUserAdmin] = useState(userData.admin);
    const [inLoad, setInLoad] = useState(true);
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (loadRecette) {
            dispatch(getRecette());
            setLoadRecette(false);
        } else {
            let total_temp = 0;
            if (!isEmpty(recettes)) {
                recettes.map((recette) => {
                    if (recette.type == "ACHAT") total_temp += recette.montant;
                    else total_temp -= recette.montant;
                });
            }
            setTotal(total_temp);
        }
        if (inLoad && !isEmpty(userData)) {
            setIsUserAdmin(userData.admin);
            setInLoad(false);
        }
    }, [userData, loadRecette, dispatch, recettes]);

    return (
        <div className="container">
            <DepenseModal toggle={toggle} modal={modal} userId={userData._id} />
            <Header title="Administration - Trésorerie" />
            {inLoad ? (
                <Spinner color="success" />
            ) : (
                <>
                    {!isUserAdmin ? (
                        <Redirect to="/" />
                    ) : (
                        <>
                            <div>
                                <ListGroup className="event-list">
                                    <h2>Dépenses</h2>

                                    <ListGroupItem>
                                        <div className="list-row">
                                            <Button
                                                color="success"
                                                onClick={toggle}
                                            >
                                                Ajouter une dépense !
                                            </Button>
                                        </div>
                                    </ListGroupItem>
                                    {!isEmpty(recettes) &&
                                        recettes
                                            .filter((recette) => {
                                                if (recette.type === "DEPENSE")
                                                    return recette;
                                            })
                                            .map((depense) => (
                                                <ListElementDepenses
                                                    depense={depense}
                                                    key={depense._id}
                                                />
                                            ))}
                                </ListGroup>
                            </div>
                            <br />
                            <div>
                                <ListGroup className="event-list">
                                    <h2>Achats</h2>

                                    {!isEmpty(recettes) &&
                                        recettes
                                            .filter((recette) => {
                                                if (recette.type === "ACHAT")
                                                    return recette;
                                            })
                                            .map((achat) => (
                                                <ListElementAchats
                                                    achat={achat}
                                                    key={achat._id}
                                                />
                                            ))}
                                </ListGroup>
                            </div>
                            <br />
                            <hr />
                            <h2 className="total">Total {total} €</h2>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminOrders;
