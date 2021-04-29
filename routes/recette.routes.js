const router = require("express").Router();
const recetteController = require("../controllers/recette.controller");

//devient adherent
router.post('/adherent', recetteController.adherent);
//produit acheté
router.post('/achat', recetteController.achatBoutique);
//dépense
router.post('/depense', recetteController.depense);
//donation
router.post('/donation', recetteController.donation);

module.exports = router;