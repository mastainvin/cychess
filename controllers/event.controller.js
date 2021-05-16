const EventModel = require("../models/event.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");

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
            `${__dirname}/../client/public/uploads/event/${fileName}`
        )
    );

    const newEvent = new EventModel({
        nom: req.body.nom,
        description: req.body.description,
        date: req.body.date,
        prix: req.body.prix,
        maxParticipants: req.body.maxParticipants,
        image: "./uploads/event/" + fileName,
        participants: [],
    });
    try {
        const event = await newEvent.save();
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
        date: req.body.date,
        maxParticipants: req.body.maxParticipants,
    };
    EventModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) {
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
        var event_id = req.params.id;
        var user_id = req.body.id;
        await EventModel.findByIdAndUpdate(
            event_id,
            {
                $pull: { participants: user_id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        await UserModel.findByIdAndUpdate(
            user_id,
            {
                $pull: { events: event_id },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.status(200).send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};
