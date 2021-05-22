const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    UserModel.findById(req.params.id, (err, docs) => {
        res.header("Access-Control-Allow-Origin", "*");

        if (!err) res.send(docs);
        else console.log("ID unknown : " + err);
    }).select("-password");
};

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio,
                    dateDeNaissance: req.body.dateDeNaissance,
                    sexe: req.body.sexe,
                    prenom: req.body.prenom,
                    nom: req.body.nom,
                    residence: req.body.residence,
                    role: req.body.role,
                    admin: req.body.admin,
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

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await UserModel.deleteOne({ _id: req.params.id }).exec();
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).json({ message: "successfully deleted." });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
