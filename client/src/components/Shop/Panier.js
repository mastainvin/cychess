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
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

import Header from "./../header";
import { isEmpty } from "../Utils";
import {
    EnleverPanier,
    ValiderPanier,
    getUser,
} from "../../actions/user.actions";
import panier_vide from "./../../images/panier-vide.png";
const Panier = ({ userData, products, modal, toggle }) => {
    const dispatch = useDispatch();
    const [carte, setCarte] = useState([]);
    const [loadCart, setLoadCart] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [inSearch, setInSearch] = useState(true);
    const [montant, setMontant] = useState(0);

    const [factVisible, setFactVisible] = useState(true);
    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value);
        setInSearch(true);
    };

    const Supprimer = async (produitASupprimer, index) => {
        await dispatch(EnleverPanier(index, userData._id));
        setCarte(carte.filter((val, idx) => index !== idx));
        setMontant(Math.round((montant - produitASupprimer.prix) * 100) / 100);
    };

    const handleValid = () => {
        const data = {
            type: "ACHAT",
            montant: montant,
            userId: userData._id,
            products: userData.userPanier,
        };
        dispatch(ValiderPanier(data));
        setCarte([]);
        setMontant(0);
    };

    useEffect(() => {
        const getUserCart = () => {
            let cart_temp = [];
            let value_temp = montant;
            userData.userPanier.map((item) => {
                products.map((product) => {
                    if (product._id === item) {
                        cart_temp.push(product);
                        value_temp += parseFloat(product.prix);
                    }
                });
            });
            setCarte(cart_temp);
            setMontant(value_temp);
        };

        if (loadCart && !isEmpty(userData.userPanier) && !isEmpty(products)) {
            getUserCart();
            setLoadCart(false);
        }
    }, [loadCart, userData, products]);

    return (
        <>
            <div className="container">
                <h2 className="panier-title ">Votre panier</h2>
                <h2 className="montant ">{montant} €</h2>
                <div className="searchBar-container">
                    <input
                        type="text"
                        name="searchBar"
                        id="searchBar"
                        onChange={handleSearchTerm}
                        placeholder="Rechercher"
                    />
                </div>
                <div className="produits">
                    {!isEmpty(carte) &&
                        carte
                            .filter((val) => {
                                return val.nom
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase());
                            })
                            .map((produit, idx) => {
                                return (
                                    <div className="itemsCart" key={idx}>
                                        <Card className="itemCart">
                                            <CardImg
                                                top
                                                width="100%"
                                                src={produit.productProfil}
                                                aalt={produit.nom}
                                            />
                                            <CardBody>
                                                <div className="contentItem">
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
                                                <CardText></CardText>
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
            <div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Paiement</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup className="paiement-ligne">
                                <Label>Adresse de livraison</Label>
                                <Input
                                    placeholder="Adresse de livraison"
                                    required
                                />
                            </FormGroup>{" "}
                            <FormGroup>
                                <Label htmlFor="checkbox">
                                    Même adresse de facturation
                                </Label>
                                <Input
                                    type="checkbox"
                                    id="checkbox"
                                    onClick={() => setFactVisible(!factVisible)}
                                    required
                                />
                            </FormGroup>
                            {factVisible && (
                                <FormGroup className="paiement-ligne">
                                    <Label>Adresse de facturation</Label>
                                    <Input placeholder="Adresse de facturation" />
                                </FormGroup>
                            )}
                            <FormGroup>
                                <Label>Numéro de carte</Label>
                                <Input
                                    placeholder="Numéro de carte"
                                    required
                                    type="tel"
                                    maxlength="16"
                                />
                            </FormGroup>{" "}
                            <div className="code-date paiement-ligne">
                                <FormGroup>
                                    <Label>Code secret</Label>
                                    <Input
                                        type="text"
                                        placeholder="Code secret"
                                        required
                                        type="tel"
                                        maxlength="3"
                                    />
                                </FormGroup>{" "}
                                <FormGroup>
                                    <Label>Date d'expiration</Label>
                                    <Input
                                        type="date"
                                        placeholder="Date d'expiration"
                                        required
                                    />
                                </FormGroup>
                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="success"
                            onClick={() => {
                                toggle();
                                handleValid();
                            }}
                        >
                            Commander
                        </Button>{" "}
                        <Button color="secondary" onClick={toggle}>
                            Quitter
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
};

export default Panier;
