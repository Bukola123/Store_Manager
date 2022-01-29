const express = require('express');
const multer = require('multer');

const auth = require('../App/middleware/auth');
const admin = require('../App/middleware/admin');


const { categoryValidation} = require('../App/middleware/categoryValidation');
const { createCategory } = require('../App/controllers/category/createCategory');


const router = express.Router();



router.post('/', [auth,admin, categoryValidation], createCategory);


module.exports = router;
