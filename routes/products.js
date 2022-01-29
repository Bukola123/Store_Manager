const express = require('express');
const multer = require('multer');

const auth = require('../App/middleware/auth');
const admin = require('../App/middleware/admin');

const {
    updateProduct,
    createProduct,
    getAllProduct,
    getProduct
} = require('../App/controllers/products/index');


const {
    productValidation
} = require('../App/middleware/productValidation');

const { authCredentialsValidation } = require('../App/middleware/authValidation');
const  {loginUser } = require('../App/controllers/auth');


const router = express.Router();
const upload = multer({ dest: 'tmp/' });


router.post('/', [auth,admin, productValidation], createProduct);
router.get('/',auth, getAllProduct);
router.patch('/:id',[auth,admin], updateProduct);
router.get('/:id',auth, getProduct);



module.exports = router;
