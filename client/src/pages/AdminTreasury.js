import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { isAdmin, isEmpty } from "../components/Utils";
import { Redirect } from "react-router";
import Header from "../components/header";
import { NavLink } from "react-router-dom";

import { getProducts } from "../actions/product.actions";
import { getUsers } from "../actions/users.actions";
import { getRecette } from "../actions/recette.actions.js";

import "./product-admin.scss";

const AdminTreasury = () => {
    const userData = useSelector((state) => state.userReducer);
    const notAdmin = !isAdmin(userData);
    const products = useSelector((state) => state.productReducer);
    const [loadProduct, setLoadProduct] = useState(true);
    const recettes = useSelector((state) => state.recetteReducer);
    const [loadRecette, setLoadRecette] = useState(true);
    const users = useSelector((state) => state.usersReducer);
    const [loadUser, setLoadUser] = useState(true);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [outOfStock, setoutOfStock] = useState(0);
    /*const [nb_total, setnb_total] = useState(0);*/
    const [inLoad, setInLoad] = useState(true);
    const [isUserAdmin, setIsUserAdmin] = useState(userData.admin);
    /*const outOfStock = useRef(0);*/
    const Totale = useRef(0);
    const nb_total = useRef(0);
    const achats = useRef(0);
    const depenses = useRef(0);
    const test = 25;
    const [total, setTotal] = useState(0);

    const toggle = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (loadProduct ) {
            dispatch(getProducts());
            setLoadProduct(false);
            /*dispatch(getUsers());
            setLoadUser(false);
            dispatch(getRecette());
            setLoadRecette(false);*/
        }else {
            let outOfStock_temp = 0;
            if (!isEmpty(products)) {
                products.map((produit) => {
                    if (produit.nb_restant == 0) {
                        outOfStock_temp = outOfStock_temp + 1;
                        
                    }
                });
            }
            setoutOfStock(outOfStock_temp);
        }

        if (loadRecette) {
            dispatch(getRecette());
            setLoadRecette(false);
        } else {
            let total_temp = 0;
            if (!isEmpty(recettes)) {
                recettes.map((recette) => {
                    if (recette.type == "ACHAT") total_temp += recette.montant;
                    else total_temp -= recette.montant;
                });
            }
            setTotal(total_temp);
        }
        if (inLoad && !isEmpty(userData)) {
            setIsUserAdmin(userData.admin);
            setInLoad(false);
        }




    }, [
        loadProduct,
        dispatch,
        userData,
        products,
        loadUser,
        users,
        recettes,
        loadRecette,
    ]);

    console.log(achats.current);
    console.log(depenses.current);
    console.log(Totale.current);

    return (
        <div className="container">
            <Header title="Administration - Dashboard" />
            {notAdmin ? (
                <Redirect to="/" />
            ) : (
                <div>
                    {
                        <div className="col-12 col-md-10">
                            <Fragment>
                                <div className="row pr-4">
                                    <div className=" col-xl-12 col-sm-12 mb-3">
                                        <div className="card text-white bg-primary o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">
                                                    Totale
                                                    <br />{" "}
                                                    <b>{total} €</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row pr-4">
                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-success o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size ">
                                                    Produits
                                                    <br />
                                                    <b>
                                                        {products &&
                                                            products.length}
                                                    </b>{" "}
                                                </div>
                                            </div>
                                            <NavLink
                                                className="card-footer text-white clearfix small z-1"
                                                exact
                                                to="/shop-admin"
                                            >
                                                <span className="float-left">
                                                    Plus de détails
                                                </span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-danger o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">
                                                    Commandes
                                                    <br />
                                                    <b>
                                                    {recettes.length} </b>{" "}
                                                </div>
                                            </div>
                                            <NavLink
                                                className="card-footer text-white clearfix small z-1"
                                                exact
                                                to="/Orders-admin"
                                            >
                                                <span className="float-left">
                                                    Plus de détails
                                                </span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-info o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">
                                                    Utilisateurs
                                                    <br />{" "}
                                                    <b>
                                                        {users && users.length}
                                                    </b>
                                                </div>
                                            </div>
                                            <NavLink
                                                className="card-footer text-white clearfix small z-1"
                                                to="/users-admin"
                                            >
                                                <span className="float-left">
                                                    Plus de détails
                                                </span>
                                                <span className="float-right">
                                                    <i className="fa fa-angle-right"></i>
                                                </span>
                                            </NavLink>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-sm-6 mb-3">
                                        <div className="card text-white bg-warning o-hidden h-100">
                                            <div className="card-body">
                                                <div className="text-center card-font-size">
                                                    fin du Stock
                                                    <br />
                                                    <b>
                                                    {outOfStock}
                                                    </b>{" "}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export default AdminTreasury;
