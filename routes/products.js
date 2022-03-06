const express = require('express');
const multer = require('multer');

const auth = require('../App/middleware/auth');
const admin = require('../App/middleware/admin');

const {
    updateProduct,
    createProduct,
    getAllProduct,
    getProduct,
    deleteProduct,
    addBulkProduct
} = require('../App/controllers/products/index');


const {
    productValidation
} = require('../App/middleware/productValidation');

const { authCredentialsValidation } = require('../App/middleware/authValidation');
const  {loginUser } = require('../App/controllers/auth');


const router = express.Router();
const upload = multer({ dest: 'tmp/' });


router.patch('/:categoryId', [auth,admin, productValidation,upload.single('avatar')], createProduct);
router.get('/',auth, getAllProduct);
router.post('/:id',[auth,admin,upload.single('avatar'),], updateProduct);
router.get('/:id',auth, getProduct);
router.delete('/:productId', [auth,admin], deleteProduct);
router.patch('/bulk/:categoryId', [auth,admin, productValidation], addBulkProduct);



module.exports = router;
