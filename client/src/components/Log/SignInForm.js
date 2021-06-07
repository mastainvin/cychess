import React, { useState } from "react";
import "./style.scss";
import axios from "axios";
import loginImg from "../../images/login.svg";

const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");

        axios({
            method: "post",
            url: `/api/user/login`,
            withCredentials: true,
            data: {
                email,
                password,
            },
        })
            .then((res) => {
                console.log(res);
                if (res.data.errors) {
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    window.location = "/";
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="form-login">
            <div className="log-content">
                <div className="image">
                    <img src={loginImg} />
                </div>
                <form action="" onSubmit={handleLogin} className="sign-up-form">
                    <div className="form-group">
                        {/* <label htmlFor="email">
                            <span>Email</span>
                        </label>
                        <br /> */}
                        <input
                            type="text"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email"
                        ></input>
                    </div>
                    {/* <br /> */}
                    <div className="email error"></div>
                    {/* <br /> */}
                    <div className="form-group">
                        {/* <label htmlFor="password">Mot de passe :</label> */}
                        {/* <br /> */}
                        <input
                            type="password"
                            name="pasword"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Mot de passe"
                        ></input>
                    </div>
                    {/* <br /> */}
                    <div className="password error"></div>
                    {/* <br /> */}
                    <div className="footer">
                        <input
                            className="btn"
                            type="submit"
                            value="Se connecter"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInForm;
