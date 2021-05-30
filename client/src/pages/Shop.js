import './Shop.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Header from '../components/header';


import Bouton from '../components/Product-admin/Bouton'

import {getPosts, getProducts} from '../actions/product.actions';

import { useDispatch, useSelector, useStore } from "react-redux";
import { isAdmin, isEmpty } from "../components/Utils";
import { Redirect } from "react-router";

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';



import {  ListGroup, ListGroupItem } from "reactstrap";
import "./product-admin.scss";

import ProductModal from "../components/Product-admin/ProductModal";
import ListElement from "../components/Product-admin/ListElement"
import Valider from '../components/Valider';






const PAGE_PRODUITS = 'produits';
const PAGE_CARTE = 'carte';


function Shop() {

  const userData = useSelector((state) => state.userReducer);
    const notAdmin = !isAdmin(userData);
    const produits = useSelector((state) => state.productReducer);
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
    }, [loadProduct, dispatch]);

  
  
  const [carte , setCarte] = useState([]);

  const [page , setPage] = useState('produits');

  
      


  const ajoutDeCarte = (produit) => {

    

    setCarte([...carte , {...produit } ]);

  };


  const Supprimer = (produitASupprimer) => {

    setCarte(
      carte.filter(produit => produit !== produitASupprimer)
      );
      
   };


  const navigateTo = (nextPage) => {
    setPage(nextPage);
  }


  const renderProduits = () =>(

    <>
          <h1> Nos produits </h1>
          <div className="produits">
          { !isEmpty(produits[0]) && produits.map((produit , idx) => (
            <div className ="produitcard">
            <Card className = "Card">
              <CardImg top width="100%" src= {produit.productProfil} alt="Card image cap" />
              <CardBody className = "cardBody">
                <CardTitle tag="h5">{produit.nom}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{produit.prix}</CardSubtitle>
                <CardText className = "produitCardText">{produit.description}</CardText>
                <Bouton  produit={produit} />
              </CardBody>
            </Card>
          </div>
              
          ))}
      </div>
      </>
      
     


  );


  const renderCarte = () => (


    <>
          <h1> Carte </h1>
          <div className="produits">
          {carte.map((produit , idx) => (
              <div className="produit" key={idx}>
                  <h3>{produit.nom}</h3>
                  <h4>{produit.prix}</h4>
                  <img src={produit.productProfil} alt={produit.nom}/>
                  <button onClick = {() => Supprimer(produit)}> Annuler </button>
                  </div>

          ))}
      </div>
      </>
      


  );


  return (

    
      <div className ="valider">
        <header>
          <button onClick = {() => navigateTo(PAGE_CARTE)}>Aller à l'achat ({carte.length})</button>
          <button onClick = {() => navigateTo(PAGE_PRODUITS)}>Voir les produits</button>
        </header>


         <Valider  />

        

       
        {page === PAGE_PRODUITS && renderProduits()}
        {page ===  PAGE_CARTE && renderCarte()}
        </div>
  );









 }


 export default Shop;