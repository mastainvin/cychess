const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        pseudonyme: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            unique: true,
            trim: true,
        },

        prenom: {
            type: String,
            required: false,
            minlength: 2,
            maxlength: 50,
            unique: false,
            trim: true,
        },

        nom: {
            type: String,
            required: false,
            minlength: 2,
            maxlength: 50,
            unique: false,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlenght: 1024,
            trim: true,
        },

        dateDeNaissance: {
            type: String,
            required: false,
            lastActiveAt: Date,
        },

        sexe: {
            required: false,
            type: String,
        },

        residence: {
            required: false,
            type: String,
            trim: true,
        },

        roleEventuel: {
            type: String,
        },

        admin: {
            type: Boolean,
            default: false,
        },

        bio: {
            type: String,
            maxlenght: 1024,
        },
        userProfil: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
};

//play fonction before save into display: 'block'
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
