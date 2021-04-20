module.exports.signUpErrors = (err) => {
    let errors = { pseudonyme: "", email: "", password: "" };

    if (err.message.includes("pseudonyme"))
        errors.pseudo = "Pseudo incorrect ou déjà pris.";

    if (err.message.includes("email")) errors.email = "Email incorrecte.";

    if (err.message.includes("password"))
        errors.password = "Le mot de passe doit faire 6 caractères minimum.";

    if (err.code === 11000 && Object.keys(errors.keyValue)[0].includes("email"))
        errors.mail = "Le mail est déjà enregistré.";

    if (
        err.code === 11000 &&
        Object.keys(errors.keyValue)[0].includes("pseudonyme")
    )
        errors.pseudonyme = "Le pseudonyme est déjà enregistré.";

    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message.includes("email")) errors.email = "Email inconnue.";

    if (err.message.includes("password"))
        errors.password = "Mot de passe incorrect.";

    return errors;
};
