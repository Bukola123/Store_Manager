const express = require('express');

const auth = require('../App/middleware/auth');
const {salesValidation} = require('../App/middleware/salesValidation');
const {makeSales,getAllSales,getSalesByAttendant, getSale} = require('../App/controllers/Sales/makeSales')



const router = express.Router();

router.get('/all',[auth], getAllSales);
router.post('/',[auth,salesValidation], makeSales);
router.get('/',[auth], getSalesByAttendant);
router.get('/:id',[auth], getSale);


module.exports = router;


