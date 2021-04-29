import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
// import Home from "../../pages/Home";
// import Profil from "../../pages/Profil";
import NavBar from "../NavigBar/NavBar";

const index = () => {
    return (
        <Router>
            <NavBar></NavBar>
            <Switch>
                {/* <Route path="/" exact component={Home} />
                <Route path="/Profil" exact component={Profil} /> */}
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default index;
