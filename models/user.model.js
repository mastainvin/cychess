const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        pseudonyme: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            unique: false,
            trim: true
        },

        prenom: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            unique: false,
            trim: true
            },

        nom: {
            type: String,
            required: true,
            minlength: 2,
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
            minlength: 6,
            maxlenght: 1024,
            },

        dateDeNaissance: {
            type: String,
            required: true,
            lastActiveAt: Date,
        },

        sexe: {
            type: String
        },

        residence:{
            type: String
        },

        roleEventuel:{
            type: String
        },

        admin:{
            type: Boolean,
            default: false
        },

        bio:{
            type: String,
            maxlenght: 1024
        }

    },
    {
        timestamps:true,
    }
);
//play fonction before save into display: 'block'
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;