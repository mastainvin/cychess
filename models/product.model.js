const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
            unique: true,
        }, 
        description: {
            type: String,
            required: true
        },
        prix: {
            type: String,
            required: true
        },
        productProfil: {
            type: String,
            required: true
        },
        nb_restant: {
            type: String,
            required: true
        },
        acheteur: {
            type:
            [
                {
                    acheteurId: String,
                    timestamp: Number
                }
            ]
        }
    }
);

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;