const { check } = require('express-validator');

exports.salesValidation = [
    check('customer', 'customer is required').not().isEmpty().isString()
];

