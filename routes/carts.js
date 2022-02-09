const express = require('express');
const { addCart } = require('../App/controllers/Sales/actions');

const auth = require('../App/middleware/auth');

const router = express.Router();

router.post('/:productId', auth, addCart);

module.exports = router;


