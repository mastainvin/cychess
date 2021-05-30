import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import  { Fragment, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { isAdmin } from "../components/Utils";
import { Redirect } from "react-router";
import Header from "../components/header";
import { NavLink } from "react-router-dom";

import { getProducts } from "../actions/product.actions";





import "./product-admin.scss";




const AdminTreasury =  () => {
    const userData = useSelector((state) => state.userReducer);
    const notAdmin = !isAdmin(userData);
    const products = useSelector((state) => state.productReducer);
    const [loadProduct, setLoadProduct] = useState(true);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    /*const [outOfStock, setoutOfStock] = useState(0);
    const [nb_total, setnb_total] = useState(0);*/
    
   const outOfStock = useRef(0) ;
   const nb_total = useRef(0) ; 

      
    
    
  
    const toggle = () => {
        setModal(!modal);
    };
    
    
    useEffect(() => {
         

    
        
        if (loadProduct) {
            dispatch(getProducts());
            setLoadProduct(false);
            
        }
        else{
            
            products.map(produit => {
                
               
            
               
                if(produit.nb_restant == 0 ){
                    outOfStock.current = outOfStock.current + 1;
                    return(outOfStock.current);
                       
                }

                nb_total.current = nb_total.current + Number(   produit.nb_restant );
                
                console.log(nb_total.current);

                return(nb_total.current,outOfStock.current);
                
            } )
            
        }
        console.log(outOfStock.current);
    }, [loadProduct, dispatch, products]);

    console.log(outOfStock.current);
    

    return (
        <div className="container">
            <Header title="Administration - Dashboard" />
            {notAdmin ? (
                <Redirect to="/" />
            ) : (
                <div>{
                    <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>
                    

                    
                        <Fragment>
                            

                            <div className="row pr-4">
                                <div className=" col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Totale<br /> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size ">Produits<br/><b>{nb_total.current}</b> </div>
                        
                                        </div>
                                        <NavLink className="card-footer text-white clearfix small z-1" exact to="/shop-admin" >
                                            <span className="float-left">Plus de détails</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </NavLink>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Commandes<br /> </div>
                                        </div>
                                        <NavLink className="card-footer text-white clearfix small z-1" exact to="/Orders-admin">
                                            <span className="float-left">Plus de détails</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </NavLink>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Utilisateurs<br /> </div>
                                        </div>
                                        <NavLink className="card-footer text-white clearfix small z-1" to="/users-admin">
                                            <span className="float-left">Plus de détails</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </NavLink>
                                    </div>
                                </div>
                                
                                

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">fin du Stock<br /><b>{outOfStock.current}</b> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    

                </div>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    }</div>
            )}
        </div>
    );
};

export default AdminTreasury;