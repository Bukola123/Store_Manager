const mongoose = require('mongoose');

const Products = require('./products');
const Sales = require('../models/sales');
const Customer = require('../models/customer');

const Schema = mongoose.Schema;

const cartSchema = new Schema ({
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }],
    quantity: {
        type: Number,
        default: 0
    },
    amount:{
        type: Number
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});




module.exports = mongoose.model('Cart',cartSchema);