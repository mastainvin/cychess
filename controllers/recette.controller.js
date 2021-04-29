const RecetteModel = require('../models/recette.model');

module.exports.adherent = async (req, res) => {
    const {
        type,
        montant,
        userId
    } = req.body;

    try {
        const adherent = await RecetteModel.create({
            type,
            montant,
            userId
        });   
        res.status(201).json({ adherent: adherent._id });
    } catch (err) {
        res.status(200).send({ err });
    }
};

module.exports.achatBoutique = async (req, res) => {
    const {
        type,
        montant,
        userId,
        productId
    } = req.body;

    try {
        const achat = await RecetteModel.create({
            type,
            montant,
            userId,
            productId
        });   
        res.status(201).json({ achat: achat._id });
    } catch (err) {
        res.status(200).send({ err });
    }
};

module.exports.donation = async (req, res) => {
    const {
        type,
        montant,
        userId
    } = req.body;

    try {
        const donation = await RecetteModel.create({
            type,
            montant,
            userId
        });   
        res.status(201).json({ donation: donation._id });
    } catch (err) {
        res.status(200).send({ err });
    }
};

module.exports.depense = async (req, res) => {
    const {
        type,
        montant,
        userId,
        description
    } = req.body;

    try {
        const depense = await RecetteModel.create({
            type,
            montant,
            userId,
            description
        });   
        res.status(201).json({ depense: depense._id });
    } catch (err) {
        res.status(200).send({ err });
    }
};