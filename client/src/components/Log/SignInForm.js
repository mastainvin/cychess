import React, { useState } from "react";
import "./index.css";
import axios from "axios";

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");

        axios({
            method: "post",
            url: "${process.env.REACT_APP_API_URL}api/user/login",
            withCredentials: true,
            data: {
                email,
                password,
            },
        })
            .then((res) => {
                if (res.data.errors) {
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.dk;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div id="form_login">
            <p>Connexion :</p>
            <form action="" onSubmit={handleLogin} id="sign-up-form">
                <label htmlFor="email">Email :</label>
                <br />
                <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                ></input>
                <br />
                <div className="email error"></div>
                <br />
                <label htmlFor="password">Mot de passe :</label>
                <br />
                <input
                    type="password"
                    name="pasword"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                ></input>
                <br />
                <div className="password error"></div>
                <br />
                <input type="submit" value="Se connecter" />
            </form>
        </div>
    );
};

export default SignInForm;
