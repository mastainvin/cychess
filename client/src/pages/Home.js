import React from 'react';
import NavBar from '../components/NavigBar/NavBar';
import "./Home.css";
import "../images/test.svg";

const Home = () => {
    return (
        <div className="profil-page">
            <div className="log-container">
                <NavBar></NavBar>
                <h4><b><i>Qui sommes nous ?</i></b></h4>
                <img src={require("../images/test.svg").default} height={200} width={200} />
                <br />
                <p>CY Chess est une association d'échecs au sein de cy tech qui accueille des membres de tous les niveaux. 
                Que vous soyez débutant ou joueur aguérri vous pourrez venir faire des parties pour le divertissement ou au contraire 
                venir jouer pour progresser.</p>
            </div>
        </div>
    );
};




export default Home;

