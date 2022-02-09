const express = require('express');

const auth = require('../App/middleware/auth');
const salesValidation = require('../App/middleware/salesValidation');

const router = express.Router();

//router.post('/', [auth, salesValidation], makeSales);


module.exports = router;


