import "./Shop.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

import Bouton from "../components/Product-admin/Bouton";

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
} from "reactstrap";

import "./product-admin.scss";
import axios from "axios";
import { EnleverPanier, getUser } from "../actions/user.actions";

const PAGE_PRODUITS = "produits";
const PAGE_CARTE = "carte";

function Shop() {
    const userData = useSelector((state) => state.userReducer);
    // const produits = useSelector((state) => state.productReducer);
    const [loadProduct, setLoadProduct] = useState(true);
    const dispatch = useDispatch();

    const [carte, setCarte] = useState([]);

    const getProduct = (id, cart) => {
        axios
            .get(`${process.env.REACT_APP_API_URL}api/product/${id}`)
            .then((res) => {
                cart.push(res.data);
            })
            .catch((err) => console.log(err));
    };

    const getUserCart = (user) => {
        let cart = [];
        if (!isEmpty(user.userPanier)) {
            user.userPanier.map((productId) => {
                getProduct(productId, cart);
            });
        }
        return cart;
    };

    const [page, setPage] = useState("produits");

    const ajoutDeCarte = (produit) => {
        setCarte([...carte, { ...produit }]);
    };

    const Supprimer = (produitASupprimer, index) => {
        dispatch(EnleverPanier(index, userData._id));
        setCarte(carte.filter((produit) => produit !== produitASupprimer));
    };

    const navigateTo = (nextPage) => {
        setPage(nextPage);
    };

    // const renderProduits = () => (
    //     <>
    //         <h1> Nos produits </h1>
    //         <div className="produits">
    //             {!isEmpty(produits[0]) &&
    //                 produits.map((produit, idx) => (
    //                     <div className="produitcard">
    //                         <Card className="Card">
    //                             <CardImg
    //                                 top
    //                                 width="100%"
    //                                 src={produit.productProfil}
    //                                 alt="Card image cap"
    //                             />
    //                             <CardBody className="cardBody">
    //                                 <CardTitle tag="h5">
    //                                     {produit.nom}
    //                                 </CardTitle>
    //                                 <CardSubtitle
    //                                     tag="h6"
    //                                     className="mb-2 text-muted"
    //                                 >
    //                                     {produit.prix}
    //                                 </CardSubtitle>
    //                                 <CardText className="produitCardText">
    //                                     {produit.description}
    //                                 </CardText>
    //                                 <Bouton
    //                                     produit={produit}
    //                                     onClick={ajoutDeCarte(produit)}
    //                                 />
    //                             </CardBody>
    //                         </Card>
    //                     </div>
    //                 ))}
    //         </div>
    //     </>
    // );

    useEffect(() => {
        if (loadProduct) {
            dispatch(getProducts());
            setLoadProduct(false);
        }
        setCarte(getUserCart(userData));
    }, [userData, loadProduct, dispatch]);

    console.log(carte);
    const renderCarte = () => (
        <>
            <h1> Carte </h1>
            <div className="produits">
                {!isEmpty(carte) &&
                    carte.map((produit, idx) => (
                        <div className="produit" key={idx}>
                            {/* <h3>{produit.nom}</h3>
                            <h4>{produit.prix}</h4> */}
                            <img
                                src={produit.productProfil}
                                alt={produit.nom}
                            />
                            <button onClick={() => Supprimer(produit, idx)}>
                                {" "}
                                Annuler{" "}
                            </button>
                        </div>
                    ))}
            </div>
        </>
    );

    return (
        <div>
            <header>
                <button onClick={() => navigateTo(PAGE_CARTE)}>
                    Aller à l'achat{/* Aller à l'achat (not carte.length}) */}
                </button>
                <button onClick={() => navigateTo(PAGE_PRODUITS)}>
                    Voir les produits
                </button>
            </header>
            {/* {page === PAGE_PRODUITS && renderProduits()} */}
            {page === PAGE_CARTE && renderCarte()}
        </div>
    );
}

export default Shop;
