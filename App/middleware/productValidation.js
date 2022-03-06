const { check } = require('express-validator');

exports.productValidation = [
    check('name', 'Enter a valid name'),
    check('Description', 'Enter a valid Description'),
    check('price', 'Enter a valid price'),
    check('qty', 'Enter a valid quantity available'),
    
];

