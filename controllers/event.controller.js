const EventModel = require("../models/event.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readEvent = (req, res) => {
    EventModel.find((err, docs) => {
        if (!err) {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(docs);
        } else {
            console.log("Error to get events data : " + err);
        }
    }).sort({ createdAt: -1 });
};

module.exports.createEvent = async (req, res) => {
    const newEvent = new EventModel({
        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix,
        maxParticipants: req.body.maxParticipants,
        participants: [],
    });
    try {
        const event = await newEvent.save();
        res.header("Access-Control-Allow-Origin", "*");
        return res.status(201).json(event);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.updateEvent = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const updatedRecord = {
        nom: req.body.nom,
        description: req.body.description,
        prix: req.body.prix,
        maxParticipants: req.body.maxParticipants,
    };
    EventModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) {
                res.header("Access-Control-Allow-Origin", "*");
                res.send(docs);
            } else {
                console.log("Update error : " + err);
            }
        }
    );
};

module.exports.deleteEvent = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    EventModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(docs);
        } else {
            console.log("Delete error : " + err);
        }
    });
};

module.exports.participateEvent = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { events: req.params.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await EventModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { participants: req.body.id },
            },
            { new: true },
            (err, docs) => {
                res.header("Access-Control-Allow-Origin", "*");
                if (!err) return res.status(200).send(docs);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.unparticipateEvent = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await EventModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { participants: req.body.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { events: req.params.id },
            },
            { new: true },
            (err, docs) => {
                res.header("Access-Control-Allow-Origin", "*");
                if (!err) return res.status(200).send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};
