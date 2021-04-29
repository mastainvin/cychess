const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            trim: true,
            maxlength: 100,
            unique: true,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 2000,
        },
        prix: {
            type: Number,
            required: false,
        },
        maxParticipants: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        participants: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("event", EventSchema);
