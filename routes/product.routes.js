const router = require("express").Router();
const productController = require('../controllers/product.controller');

//product db
router.post('/post', productController.insertProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.productInfo);
router.delete('/:id', productController.deleteProduct);
//product acheteur
router.patch('/:id', productController.nb_acheteur)

module.exports = router;