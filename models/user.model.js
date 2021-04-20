const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema(
    {
        prenom: {
            type: String,
            required: true,
            minLength: 2,
            maxlength: 50,
            unique: false,
            trim: true
        },

        nom: {
            type: String,
            required: true,
            minLength: 2,
            maxlength: 50,
            unique: false,
            trim: true
            },

        email: {
            type: String,
            required: true,
            validate:[isEmail],
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            max: 1024,
            }
    },
    {
        timestamps:true,
    }
)

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;