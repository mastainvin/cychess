import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { isAdmin, isEmpty } from "../components/Utils";
import { Redirect } from "react-router";
import Header from "../components/header";
import { getOrders } from "../actions/order.actions";
import { Button, ListGroup, ListGroupItem,Spinner } from "reactstrap";
import "./order-admin.scss";
import EventModal from "../components/Event-admin/EventModal";
import OrderModal from "../components/Order-admin/OrderModal";
import ListElement from "../components/Order-admin/ListElement";
import { getRecette } from "../actions/recette.actions.js";

const AdminOrders = () => {
    const userData = useSelector((state) => state.userReducer);
    const notAdmin = !isAdmin(userData);
    const orders = useSelector((state) => state.orderReducer);
    const recettes = useSelector((state) => state.recetteReducer);
    const [loadRecette, setLoadRecette] = useState(true);
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
        }
        if (inLoad && !isEmpty(userData)) {
            setIsUserAdmin(userData.admin);
            setInLoad(false);
        }
    }, [userData,loadRecette, dispatch, recettes]);
    return (
        <div className="container">
            <EventModal toggle={toggle} modal={modal} />
            <Header title="Administration - Commandes" />
            {inLoad ? (
                <Spinner color="success" />
            ) : (
                <>
                    {!isUserAdmin ? (
                        <Redirect to="/" />
                    ) : (
                        <div>
                            <ListGroup className="commandes-list">
                                <ListGroupItem>
                                    <div className="commandes-row">
                                        <Button
                                            color="success"
                                            onClick={toggle}
                                        >
                                            Ajouter une commande !
                                        </Button>
                                    </div>
                                </ListGroupItem>
                                {!isEmpty(recettes) &&
                                    recettes.map((recette) => (
                                        <ListElement
                                            recette={recette}
                                            key={recette._id}
                                        />
                                    ))}
                            </ListGroup>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminOrders;
