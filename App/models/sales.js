const mongoose = require('mongoose');
const Products = require('./products');
const Schema = mongoose.Schema;
const Customers = require('./customer');
const User = require('./users');


const saleSchema = new Schema ({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customers'
    },
    attendant: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prices: [{
        type: String,
        default: 100
    }],
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }],
    soldAt: {
        type: Date,
        default: Date.now()
    },
    quantity: [{
        type: Number,
        default: 0
    }],
    totalPrice:{
        type: Number,
        default: 0
    }

});


module.exports = mongoose.model('Sales', saleSchema);