import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { isAdmin, isEmpty } from "../components/Utils";
import { Redirect } from "react-router";
import Header from "../components/header";
import { getProducts } from "../actions/product.actions";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import "./product-admin.scss";

import ProductModal from "../components/Product-admin/ProductModal";
import ListElement from "../components/Product-admin/ListElement";

const AdminShop = () => {
    const userData = useSelector((state) => state.userReducer);
    const notAdmin = !isAdmin(userData);
    const products = useSelector((state) => state.productReducer);
    const [loadProduct, setLoadProduct] = useState(true);
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (loadProduct) {
            dispatch(getProducts());
            setLoadProduct(false);
        }
    }, [loadProduct, dispatch, products]);
    return (
        <div className="container">
            <ProductModal toggle={toggle} modal={modal} />
            <Header title="Administration - Boutique" />
            {notAdmin ? (
                <Redirect to="/" />
            ) : (
                <div>
                    <ListGroup className="event-list">
                        <ListGroupItem>
                            <div className="list-row">
                                <Button color="success" onClick={toggle}>
                                    Ajouter un produit !
                                </Button>
                            </div>
                        </ListGroupItem>
                        {!isEmpty(products) &&
                            products.map((product) => (
                                <ListElement
                                    product={product}
                                    key={product._id}
                                />
                            ))}
                    </ListGroup>
                </div>
            )}
        </div>
    );
};

export default AdminShop;
