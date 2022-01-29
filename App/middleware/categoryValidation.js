const { check } = require('express-validator');

exports.categoryValidation = [
    check('name', 'Enter a valid name').not().isEmpty(),
];
