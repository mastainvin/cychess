import React from "react";

import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import NavBar from "../NavigBar/NavBar";
import Events from "../../pages/Events";

import Shop from "../../pages/Shop";
import Order from "../../pages/Order";

import AdminTreasury from "../../pages/AdminTreasury";
import AdminShop from "../../pages/AdminShop";
import AdminEvents from "../../pages/AdminEvents";
import AdminUsers from "../../pages/AdminUsers";
import AdminOrders from "../../pages/AdminOrders";
import Forum from "../../pages/Forum";
const index = () => {
    
       
        
    return (
        <Router>
            <NavBar></NavBar>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/profil" exact component={Profil} />
                <Route path="/events" exact component={Events} />

                <Route path ="/shop" exact component = {Shop} />
                <Route path="/order" exact component={Order} />

                <Route path="/treasury-admin" exact component={AdminTreasury} />
                <Route path="/Orders-admin" exact component={AdminOrders} />
                <Route path="/shop-admin" exact component={AdminShop} />
                <Route path="/events-admin" exact component={AdminEvents} />
                <Route path="/users-admin" exact component={AdminUsers} />
<<<<<<< HEAD

=======
                <Route path="/forum" exact component={Forum} />
>>>>>>> master
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default index;
