import React, { useContext, useEffect, useState } from 'react';

import { UidContext } from  '../Routes/AppContext';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { AjoutPanier } from '../../actions/user.actions';
import {Button} from 'reactstrap';

const Bouton = ({produit}) => {

    const [ajout , setAchat] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const ajou = () => {

        dispatch(AjoutPanier(produit._id , uid))
        setAchat(true);

    };
    

    useEffect(() =>{
        if (produit.userPanier) setAchat(true)
    }, [ uid , produit.userPanier , ajout ]
    );

    return (
        <div className = 'produit-container'>

            {uid  && (
                <Button color="success" className="produitButton" onClick = {ajou} >Ajouter au panier</Button>
            )}

        </div>
    );
};


export default Bouton;