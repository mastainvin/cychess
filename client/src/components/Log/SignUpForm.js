import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import "./SignInForm";

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const pseudoError = document.querySelector(".pesudo.error");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector(
            ".password-confirm.error"
        );

        if (password !== controlPassword) {
            passwordConfirmError.innerHTML =
                "Les mots de passe ne correspondent pas";
        } else {
            await axios({
                method: "post",
                url: "${process.env.REACT_APP_API_URL}api/user/register",
                data: {
                    pseudo,
                    email,
                    password,
                },
            })
                .then((res) => {
                    if (res.data.errors) {
                        pseudoError.innerHTML = res.data.errors.pseudo;
                        emailError.innerHTML = res.data.errors.email;
                        passwordError.innerHTML = res.data.errors.password;
                    } else {
                        setFormSubmit(true);
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <>
            {formSubmit ? (
                <>
                    <span></span>
                    <h4 className="success">
                        Enregistrement réussi, vous pouvez désormais vous
                        connecter
                    </h4>
                </>
            ) : (
                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <label htmlFor="pseudo">Pseudo :</label>
                    <br />
                    <input
                        type="text"
                        name="peudo"
                        id="pseudo"
                        onChange={(e) => setPseudo(e.target.value)}
                        value={pseudo}
                    ></input>
                    <div className="pseudo error"></div>
                    <br />
                    <label htmlFor="email">Email :</label>
                    <br />
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setPassword(e.target.value)}
                        value={email}
                    ></input>
                    <div className="email error"></div>
                    <br />
                    <label htmlFor="password">Mot de passe :</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    ></input>
                    <div className="password error"></div>
                    <br />
                    <label htmlFor="password-conf">
                        Confirmer mot de passe :
                    </label>
                    <br />
                    <input
                        type="password"
                        name="password-conf"
                        id="password-conf"
                        onChange={(e) => setControlPassword(e.target.value)}
                        value={controlPassword}
                    ></input>
                    <div className="password-confirm error"></div>
                    <input type="submit" value="Valider inscription"></input>
                </form>
            )}
        </>
    );
};

export default SignUpForm;
