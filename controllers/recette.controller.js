const RecetteModel = require("../models/recette.model");
const UserModel = require("../models/user.model");



module.exports.recette = async (req, res) => {
    const recette = await RecetteModel.find();
    res.status(200).json(recette);
};


module.exports.adherent = async (req, res) => {
    const { type, montant, userId } = req.body;

    try {
        const adherent = await RecetteModel.create({
            type,
            montant,
            userId,
        });
        res.header("Access-Control-Allow-Origin", "*");

        res.status(201).json({ adherent: adherent._id });
    } catch (err) {
        res.status(200).send({ err });
    }
};

module.exports.achatBoutique = async (req, res) => {
    const { type, montant, userId, products } = req.body;
    try {
        const achat = await RecetteModel.create({
            type,
            montant,
            userId,
            products,
        });

        await UserModel.findByIdAndUpdate(
            { _id: userId },
            {
                userPanier: [],
            }
        );

        res.status(201).json({ achat: achat._id });
    } catch (err) {
        res.status(200).send({ err });
    }
};

module.exports.donation = async (req, res) => {
    const { type, montant, userId } = req.body;

    try {
        const donation = await RecetteModel.create({
            type,
            montant,
            userId,
        });
        res.header("Access-Control-Allow-Origin", "*");

        res.status(201).json({ donation: donation._id });
    } catch (err) {
        res.status(200).send({ err });
    }
};

module.exports.depense = async (req, res) => {
    const { type, montant, userId, description } = req.body;

    try {
        const depense = await RecetteModel.create({
            type,
            montant,
            userId,
            description,
        });
        res.header("Access-Control-Allow-Origin", "*");

        res.status(201).json({ depense: depense._id });
    } catch (err) {
        res.status(200).send({ err });
    }
};
