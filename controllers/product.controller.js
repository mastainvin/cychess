const ProductModel = require('../models/product.model'); 
const ObjectID = require('mongoose').Types.ObjectId; 

module.exports.getAllProducts = async (req , res) => {
    const products = await ProductModel.find();
    res.status(200).json(products); 
}

module.exports.productInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('product ID unknown : ' + req.params.id)
    
    ProductModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('product ID unknown : ' + err);
    });
};

module.exports.insertProduct = async (req, res) => {
    const {
        nom,
        description,
        prix,
        photo,
        nb_restant
    } = req.body;

    try {
        const product = await ProductModel.create({
            nom,
            description,
            prix,
            photo,
            nb_restant
        });
        res.status(201).json({ product: product._id });
    } catch (err) {
        res.status(200).send({err: "insertProduct failed : nom doit être unique"});
    }
};

module.exports.deleteProduct = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('product ID unknown : ' + req.params.id);
    try {
        await ProductModel.findByIdAndDelete({_id: req.params.id}).exec();
        res.status(200).json({ message: "product successfully deleted."});

    }catch(err){
        return res.status(500).json({ message: err});
    }
};

module.exports.nb_acheteur = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('product ID unknown : ' + req.params.id);
    
    try {
        return ProductModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    acheteur: {
                        acheteurId: req.body.acheteurId,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            {new: true},
            (err, docs) => {
                if (!err) return res.send(docs); 
                else return res.status(400).send(err);  
            }
        );
    } catch (err) {
        return res.status(400).send(err + "ici");
    }
};