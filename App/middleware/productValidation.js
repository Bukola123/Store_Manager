const { check } = require('express-validator');

exports.productValidation = [
    check('name', 'Enter a valid name').not().isEmpty(),
    check('Description', 'Enter a valid Description').not().isEmpty(),
    check('price', 'Enter a valid price').not().isEmpty(),
    check('qty', 'Enter a valid quantity available').not().isEmpty(),
    check('images', 'Enter a valid jpeg images'),
];

