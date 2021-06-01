import React, { useState } from "react";
import "./style.scss";
import axios from "axios";
import "./SignInForm";
import loginImg from "../../images/login.svg";

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudonyme, setPseudonyme] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        const pseudonymeError = document.querySelector(".pseudonyme.error");
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
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    pseudonyme,
                    email,
                    password,
                },
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.errors) {
                        pseudonymeError.innerHTML = res.data.errors.pseudonyme;
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
                <div className="form-login">
                    <div className="log-content">
                        <div className="image">
                            <img src={loginImg} />
                        </div>
                        <form
                            action=""
                            onSubmit={handleRegister}
                            id="sign-up-form"
                        >
                            <div className="form-group">
                                {/* <label htmlFor="pseudonyme">Pseudo :</label>
                    <br /> */}
                                <input
                                    type="text"
                                    name="peudo"
                                    id="pseudonyme"
                                    onChange={(e) =>
                                        setPseudonyme(e.target.value)
                                    }
                                    value={pseudonyme}
                                    placeholder="Pseudonyme"
                                ></input>
                            </div>
                            <div className="pseudonyme error"></div>
                            <div className="form-group">
                                {/* <label htmlFor="email">Email :</label>
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
                            <div className="email error"></div>
                            <div className="form-group">
                                {/* <label htmlFor="password">Mot de passe :</label>
                    <br /> */}
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    placeholder="Mot de passe"
                                ></input>
                            </div>
                            <div className="password error"></div>
                            <div className="form-group">
                                {/* <label htmlFor="password-conf">
                        Confirmer mot de passe :
                    </label>
                    <br /> */}
                                <input
                                    type="password"
                                    name="password-conf"
                                    id="password-conf"
                                    onChange={(e) =>
                                        setControlPassword(e.target.value)
                                    }
                                    value={controlPassword}
                                    placeholder="Répétez le mot de passe"
                                ></input>
                            </div>
                            <div className="password-confirm error"></div>
                            <div className="footer">
                                <input
                                    className="btn"
                                    type="submit"
                                    value="Valider inscription"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default SignUpForm;
