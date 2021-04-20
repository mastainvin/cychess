const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
    {
        prénom: {
            type: String,
            required: true,
            minLength: 2,
            maxlength: 50,
            unique: false,
            trim: true,
        },

        nom: {
            type: String,
            required: true,
            minLength: 2,
            maxlength: 50,
            unique: false,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            max: 1024,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne(email);
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect email");
    }
};
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
