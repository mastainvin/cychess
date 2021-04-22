const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            require: true,
        },
        title: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        message: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        topic: {
            type: String,
            trim: true,
            require: true,
        },
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number,
                },
            ],
            require: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("post", PostSchema);
