modules.exports.signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: "" };

    if (err.message.include("pseudo"))
        errors.pseudo = "Pseudo incorrect ou déjà pris.";

    if (err.message.include("email")) errors.email = "Email incorrecte.";

    if (err.message.include("password"))
        errors.password = "Le mot de passe doit faire 6 caractères minimum.";

    if (err.code === 11000 && Object.keys(errors.keyValue)[0].include("email"))
        errors.mail = "Le mail est déjà enregistré.";

    if (err.code === 11000 && Object.keys(errors.keyValue)[0].include("pseudo"))
        errors.pseudo = "Le pseudo est déjà enregistré.";

    return errors;
};

modules.exports.signInErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message.include(email)) errors.email = "Email inconnue.";

    if (err.password.include(password))
        errors.password = "Mot de passe incorrect.";

    return errors;
};
