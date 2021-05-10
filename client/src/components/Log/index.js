import React, { useState } from "react";
import SignUpForm, { signUpForm } from "./SignUpForm";
import SignInForm, { signInForm } from "./SignInForm";
import NavBar from "../NavigBar/NavBar";
import "./index.css";

const Log = (props) => {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignInModal(true);
            setSignUpModal(false);
        }
    };

    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li onClick={handleModals} id="register">
                        S'inscrire
                    </li>
                    <li onClick={handleModals} id="login">
                        Se connecter
                    </li>
                </ul>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
            </div>
        </div>
    );
};

export default Log;
