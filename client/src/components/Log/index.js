import React, { useState } from 'react';
import { Form } from 'reactstrap';
import SignUpForm, {signUpForm }from './SignUpForm';
import SignInForm, {signInForm} from './SignInForm';
import NavBar from '../NavBar/NavBar';
import "./index.css";

const Log = (props) => {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    const handleModals = (e) => {
        if(e.target.id == "register"){
            setSignInModal(false);
            setSignUpModal(true);
        } else if(e.target.id == "login"){
            setSignInModal(true);
            setSignUpModal(false);
        }
    }

    return (
        <div className="connection-form">
            <div className="form-container">
            <NavBar></NavBar>
                <ul>
                    <li onClick={handleModals} id="register" className="insc">S'inscrire</li>
                    <li onClick={handleModals} id="login" className="insc">Se connecter</li>
                </ul>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
            </div>
        </div>
    );
};

export default Log;