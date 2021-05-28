const ProductModel = require("../models/product.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");
module.exports.getAllProducts = async (req, res) => {
    const products = await ProductModel.find();
    res.header("Access-Control-Allow-Origin", "*");

    res.status(200).json(products);
};

module.exports.productInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("product ID unknown : " + req.params.id);

    ProductModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("product ID unknown : " + err);
    });
};

module.exports.insertProduct = async (req, res) => {
    try {
        if (
            req.file.detectedMimeType !== "image/jpg" &&
            req.file.detectedMimeType !== "image/png" &&
            req.file.detectedMimeType !== "image/jpeg"
        )
            throw Error("invalid file");

        if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
        const errors = uploadErrors(err);
        console.log(err);
        return res.status(400).json(errors);
    }

    const fileName = req.body.nom + ".jpg";
    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/product/${fileName}`
        )
    );
    const newProduct = new ProductModel({
        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix,
        nb_restant: req.body.nb_restant,
        productProfil: "./uploads/product/" + fileName,
    });
    try {
        const product = await newProduct.save();
        return res.status(201).json(product);
    } catch (err) {
        console.log(err);
        return res.status(200).send({
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
                    nb_restant: req.body.nb_restant,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        );
        console.log("_id : " + req.params.id);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
