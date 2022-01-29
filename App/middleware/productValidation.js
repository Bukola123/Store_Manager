const { check } = require('express-validator');

exports.productValidation = [
    check('name', 'Enter a valid name').isString(),
    check('Description', 'Enter a valid Description').isString(),
    check('price', 'Enter a valid price').isFloat(),
    check('qty', 'Enter a valid quantity available').isNumeric(),
    check('images', 'Enter a valid jpeg images')
];
