import React from "react";

import "./Shop.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

import { getProducts } from "../actions/product.actions";

import { useDispatch, useSelector, useStore } from "react-redux";
import { isEmpty } from "../components/Utils";

import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
} from "reactstrap";
import Header from "./../components/header";
import HeaderImg from "./../components/headerImg";
import Footer from "./../components/Footer";
import "./product-admin.scss";
import { AjoutPanier } from "../actions/user.actions";
import Panier from "../components/Shop/Panier";

const PAGE_PRODUITS = "produits";
const PAGE_CARTE = "carte";

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

function Shop() {
    const userData = useSelector((state) => state.userReducer);

    const produits = useSelector((state) => state.productReducer);
    const [loadProduct, setLoadProduct] = useState(true);
    const dispatch = useDispatch();
    const [page, setPage] = useState("produits");
    const [searchTerm, setSearchTerm] = useState("");
    const [inSearch, setInSearch] = useState(true);

    const handleSearchTerm = (e) => {
        let value = e.target.value;
        setSearchTerm(value);
        setInSearch(true);
    };
    const navigateTo = (nextPage) => {
        setPage(nextPage);
    };
    const ajoutDeCarte = (produit) => {
        dispatch(AjoutPanier(produit._id, userData._id));
    };

    const renderProduits = () => (
        <div className="container">
            <Header title="Nos produits" />
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
                {!isEmpty(produits[0]) &&
                    produits
                        .filter((val) => {
                            return val.nom
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase());
                        })
                        .map((produit, idx) => (
                            <div className="produitcard">
                                <Card className="Card">
                                    <CardImg
                                        top
                                        width="100%"
                                        src={produit.productProfil}
                                        alt="Card image cap"
                                    />
                                    <CardBody className="cardBody">
                                        <CardTitle tag="h5">
                                            {produit.nom}
                                        </CardTitle>
                                        <CardSubtitle
                                            tag="h6"
                                            className="mb-2 text-muted"
                                        >
                                            {produit.prix}
                                        </CardSubtitle>
                                        <CardText className="produitCardText">
                                            {produit.description}
                                        </CardText>
                                        <Button
                                            className="produitButton"
                                            color="success"
                                            onClick={() => {
                                                ajoutDeCarte(produit);
                                            }}
                                        >
                                            Ajouter au panier
                                        </Button>
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
            </div>
        </div>
    );

    useEffect(() => {
        if (loadProduct) {
            dispatch(getProducts());
            setLoadProduct(false);
        }
    }, [loadProduct, dispatch]);

    return (
        <div className="content">
            <HeaderImg title="Boutique" />
            <div className="shop-header container">
                <div className="shop-btn">
                    <button
                        activeClass="active"
                        active={page === PAGE_CARTE}
                        className="btn-cart"
                        onClick={() => {
                            navigateTo(PAGE_CARTE);
                        }}
                    >
                        Aller à l'achat (
                        {isEmpty(userData) ? 0 : userData.userPanier.length})
                    </button>
                    <button
                        className="btn-products"
                        onClick={() => navigateTo(PAGE_PRODUITS)}
                    >
                        Voir les produits
                    </button>
                </div>
                {!isEmpty(userData.userPanier) && page === PAGE_CARTE && (
                    <button className="btn-valid">Valider la commande</button>
                )}
            </div>
            {page === PAGE_PRODUITS && renderProduits(userData)}
            {page === PAGE_CARTE && (
                <Panier userData={userData} products={produits} />
            )}
            <Footer />
        </div>
    );
}

export default Shop;
