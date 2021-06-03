import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { isAdmin, isEmpty } from "../components/Utils";
import { Redirect } from "react-router";
import Header from "../components/header";
import { getProducts } from "../actions/product.actions";
import { Button, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import "./product-admin.scss";

import ProductModal from "../components/Product-admin/ProductModal";
import ListElement from "../components/Product-admin/ListElement";

const AdminShop = () => {
    const userData = useSelector((state) => state.userReducer);
    const notAdmin = !isAdmin(userData);
    const products = useSelector((state) => state.productReducer);
    const [isUserAdmin, setIsUserAdmin] = useState(userData.admin);
    const [inLoad, setInLoad] = useState(true);
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
        if (inLoad && !isEmpty(userData)) {
            setIsUserAdmin(userData.admin);
            setInLoad(false);
        }
    }, [userData, loadProduct, dispatch, products, inLoad]);
    return (
        <div className="container">
            <ProductModal toggle={toggle} modal={modal} />
            <Header title="Administration - Boutique" />
            {inLoad ? (
                <Spinner color="success" />
            ) : (
                <>
                    {!isUserAdmin ? (
                        <Redirect to="/" />
                    ) : (
                        <div>
                            <ListGroup className="event-list">
                                <ListGroupItem>
                                    <div className="list-row">
                                        <Button
                                            color="success"
                                            onClick={toggle}
                                        >
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
                </>
            )}
        </div>
    );
};

export default AdminShop;
