const router = require("express").Router();
const productController = require('../controllers/product.controller');
const uploadController = require('../controllers/upload.controller');
const multer = require('multer');
const upload = multer();

//product db
router.post('/post', productController.insertProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.productInfo);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);

//upload img product
router.post('/upload', upload.single('file'), uploadController.uploadImgProduct);

module.exports = router;