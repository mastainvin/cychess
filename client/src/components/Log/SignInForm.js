import React, { useState } from 'react';
import "./index.css";
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {

    }

    return (
        <div id="form_login" className="insc">
            connecter
            <form action="" onSubmit={handleLogin} id="sign-up-form"></form> 
            <label type="email">Email</label>
            <br />
            <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value="Email"></input>
            <input type="Submit" value="Se connecter"></input>
        </div>
    );
};

export default SignInForm;