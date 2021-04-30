import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import Home from "../../pages/Home";
// import Profil from "../../pages/Profil";
import NavBar from "../NavigBar/NavBar";
import Events from "../../pages/Events";

const index = () => {
    return (
        <Router>
            <NavBar></NavBar>
            <Switch>
                <Route path="/" exact component={Home} />
                {/* <Route path="/Profil" exact component={Profil} /> */}
                <Route path="/events" exact component={Events} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default index;
