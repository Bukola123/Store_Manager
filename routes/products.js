const express = require('express');
const multer = require('multer');

const auth = require('../App/middleware/auth');
const admin = require('../App/middleware/admin');

const {
    updateProduct,
    createProduct
} = require('../App/controllers/products/index');


const {
    productValidation
} = require('../App/middleware/productValidation');

const { authCredentialsValidation } = require('../App/middleware/authValidation');
const  {loginUser } = require('../App/controllers/auth');


const router = express.Router();
const upload = multer({ dest: 'tmp/' });

/*router.post('/', authCredentialsValidation, loginUser);*/
router.post('/', [auth,admin], createProduct);
router.patch('/:id',[auth,admin,productValidation], updateProduct);

module.exports = router;
