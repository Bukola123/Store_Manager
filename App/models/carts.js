const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Products = require('./products');
const Sales = require('../models/sales');
const Customer = require('../models/customer');


const cartSchema = new Schema ({
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }],
    quantity: {
        type: Number,
        required: true
    },
    amount:{
        type: Number
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

//create sales id after cart is created
cartSchema.post('save', async function (doc, next) {
    // create customer profile
    const {name, phone} = req.body;
    
    const customer = new Customer({
        name,
        phone
    });

    // save the customer
    try {
        await customer.save();
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'Internal server error' }]
        });
    };

    


next();


});




module.exports = mongoose.model('Cart',cartSchema);