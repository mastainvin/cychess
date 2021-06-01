const mongoose = require("mongoose");
const { recette } = require("../controllers/recette.controller");

const recetteSchema = new mongoose.Schema(
    {
        type: { type: String, required: true },
        montant: { type: Number, default: "0", required: true },
        userId: { type: String },
        products: { type: [String], required: true },
        description: { type: String },
    },
    {
        timestamps: true,
    }
);

const recetteModel = mongoose.model("recette", recetteSchema);
module.exports = recetteModel;
