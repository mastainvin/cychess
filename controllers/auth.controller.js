const UserModel = require('../models/user.model');


module.exports.signUp = async (req, res) => {
    const {prenom, nom, email, password} = req.body

    try {
        const user = await UserModel.create({prenom, nom, email, password});
        res.status(201).json({user: user._id})
    } catch (err) {
        res.status(200).send({ err })    
    }
}