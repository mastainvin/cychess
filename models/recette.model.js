const mongoose = require("mongoose");

const recetteSchema = new mongoose.Schema(
    {
        type : {type: String, required: true},
        montant : {type: Number, default: '0', required: true},
        userId :{type: String},
        productId :{type: String, default: ''},
        description:{type: String},
        
    },
    {
        timestamps: true
    }
);

const recetteModel = mongoose.model("recette", recetteSchema);
module.exports = recetteModel;