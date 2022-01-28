const { check } = require('express-validator');

exports.productValidation = [
    check('name', 'Name of product is required')
        .optional({ checkFalsy: true })
        .isString(),
    check('Description', 'Description is required')
        .optional({ checkFalsy: true })
        .isString(),
    check('price', 'price is required')
        .optional({ checkFalsy: true })
        .isFloat(),
    check('qty', 'Stock is required')
        .optional({ checkFalsy: true })
        .isNumeric,
    /*check('category', 'Select a category')
        .optional({ checkFalsy: true })
        .isString,*/
    check('images', 'Image is required')
        .optional({ checkFalsy: true })
        .isBase64()
    
];
