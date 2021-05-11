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

const index = () => {
    return (
        <Router>
            <NavBar></NavBar>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/profil" exact component={Profil} />
                <Route path="/events" exact component={Events} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/order" exact component={Order} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default index;
