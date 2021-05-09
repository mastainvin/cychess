const ProductModel = require("../models/product.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllProducts = async (req, res) => {
    const products = await ProductModel.find();
    res.header("Access-Control-Allow-Origin", "*");

    res.status(200).json(products);
};

module.exports.productInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("product ID unknown : " + req.params.id);

    ProductModel.findById(req.params.id, (err, docs) => {
        res.header("Access-Control-Allow-Origin", "*");

        if (!err) res.send(docs);
        else console.log("product ID unknown : " + err);
    });
};

module.exports.insertProduct = async (req, res) => {
    const { nom, description, prix, photo, nb_restant } = req.body;

    try {
        const product = await ProductModel.create({
            nom,
            description,
            prix,
            photo,
            nb_restant,
        });
        res.header("Access-Control-Allow-Origin", "*");

        res.status(201).json({ product: product._id });
    } catch (err) {
        res.status(200).send({
            err: "insertProduct failed : nom doit être unique",
        });
    }
};

module.exports.deleteProduct = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("product ID unknown : " + req.params.id);
    try {
        await ProductModel.findByIdAndDelete({ _id: req.params.id }).exec();
        res.header("Access-Control-Allow-Origin", "*");

        res.status(200).json({ message: "product successfully deleted." });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.updateProduct = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await ProductModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    nom: req.body.nom,
                    description: req.body.description,
                    prix: req.body.prix,
                    photo: req.body.photo,
                    nb_restant: req.body.nb_restant,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                res.header("Access-Control-Allow-Origin", "*");

                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        );
        console.log("_id : " + req.params.id);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
