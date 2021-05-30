import React, { useContext, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import {Button} from 'reactstrap'
import { UidContext } from './Routes/AppContext';
import { ValiderPanier } from '../actions/user.actions';


const Valider = ({produit}) => {

    const [valid , setValider] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const vali = () => {

        dispatch(ValiderPanier(produit._id , uid));
        setValider(true);

    };
    

    useEffect(() =>{
        if (produit.validPanier) setValider(true)
    }, [ uid , produit.validPanier , valid ]
    );

    return (
        <div className = 'produit-container'>

            {uid  && (
                <Button color="success" className="produitButton" onClick = {vali} > Valider la commande </Button>
            )}

        </div>
    );
};


export default Valider;
