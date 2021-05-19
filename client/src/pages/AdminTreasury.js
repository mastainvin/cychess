import React from "react";
import { useDispatch,useSelector } from "react-redux";
import  { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { isAdmin } from "../components/Utils";
import { Redirect } from "react-router";
import Header from "../components/header";


const AdminTreasury = () => {
    const userData = useSelector((state) => state.userReducer);
    const notAdmin = !isAdmin(userData);

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
                                            <div className="text-center card-font-size ">Produits<br /> </div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" >
                                            <span className="float-left">Plus de détails</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Commandes<br /> </div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">Plus de détails</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Utilisateurs<br /> </div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">Plus de détails</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">fin du Stock<br /> </div>
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