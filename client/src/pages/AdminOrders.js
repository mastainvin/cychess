import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { isAdmin, isEmpty } from "../components/Utils";
import { Redirect } from "react-router";
import Header from "../components/header";
import { getOrders } from "../actions/order.actions";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import "./order-admin.scss";

import OrderModal from "../components/Order-admin/OrderModal";
import ListElement from "../components/Order-admin/ListElement";

const AdminOrders = () => {
    const userData = useSelector((state) => state.userReducer);
    const notAdmin = !isAdmin(userData);
    const orders = useSelector((state) => state.orderReducer);
    
    const [loadOrder, setLoadOrder] = useState(true);
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (loadOrder) {
            dispatch(getOrders());
            setLoadOrder(false);
        }
    }, [loadOrder, dispatch, orders]);
    return (
        <div className="container">
            <OrderModal toggle={toggle} modal={modal} />
            <Header title="Administration - Commandes" />
            {notAdmin ? (
                <Redirect to="/" />
            ) : (
                <div>
                    <ListGroup className="event-list">
                        <ListGroupItem>
                            <div className="list-row">
                                <Button color="success" onClick={toggle}>
                                    Ajouter une commandes !
                                </Button>
                            </div>
                        </ListGroupItem>
                        {!isEmpty(orders) &&
                            orders.map((order) => (
                                <ListElement
                                    product={order}
                                    key={order._id}
                                />
                            ))}
                    </ListGroup>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
