import React from "react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
} from "reactstrap";

import Header from "./../header";
import { isEmpty } from "../Utils";
import { EnleverPanier, getUser } from "../../actions/user.actions";
import panier_vide from "./../../images/panier-vide.png";
const Panier = ({ userData, products }) => {
    const dispatch = useDispatch();
    const [carte, setCarte] = useState([]);
    const [loadCart, setLoadCart] = useState(true);

    const Supprimer = async (produitASupprimer, index) => {
        await dispatch(EnleverPanier(index, userData._id));
        setCarte(carte.filter((val, idx) => index !== idx));
    };

    useEffect(() => {
        const getUserCart = () => {
            let cart_temp = [];
            userData.userPanier.map((item) => {
                products.map((product) => {
                    if (product._id === item) cart_temp.push(product);
                });
            });
            setCarte(cart_temp);
        };

        if (loadCart && !isEmpty(userData.userPanier) && !isEmpty(products)) {
            getUserCart();
            setLoadCart(false);
        }
    }, [loadCart, userData, products]);

    return (
        <div className="container">
            <Header title="Votre panier" />
            <div className="produits">
                {!isEmpty(carte) &&
                    carte.map((produit, idx) => {
                        return (
                            <div className="items" key={idx}>
                                <Card className="item">
                                    <CardImg
                                        top
                                        width="100%"
                                        src={produit.productProfil}
                                        aalt={produit.nom}
                                    />
                                    <CardBody>
                                        <div className="content">
                                            <CardTitle tag="h5">
                                                {produit.nom}
                                            </CardTitle>
                                            <CardSubtitle
                                                tag="h6"
                                                className="mb-2 text-muted"
                                            >
                                                {produit.prix} €
                                            </CardSubtitle>
                                        </div>

                                        <Button
                                            color="secondary"
                                            onClick={() =>
                                                Supprimer(produit, idx)
                                            }
                                        >
                                            {" "}
                                            Annuler{" "}
                                        </Button>
                                    </CardBody>
                                </Card>
                            </div>
                        );
                    })}

                {isEmpty(carte) && (
                    <div className="no-product">
                        <img className="panier_vide" src={panier_vide} />

                        <h2>Votre panier est vide !</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Panier;
