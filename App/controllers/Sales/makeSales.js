const { validationResult } = require('express-validator');


const Sales = require('../../models/sales');
const Customer = require('../../models/customer');
const Product = require('../../models/products');


//creating a product
exports.makeSales = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name , phone} = req.body;
    

    
    const customer = new Customer({
        name,
       phone
    });
   

    // save the customer
    try {
        await customer.save();
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                errors: [{ msg: 'Sales already made' }]
            });
        }
        return res.status(500).json({ msg: 'Internal server error' });
    };

    const {product} = req.params
    

};