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
    price: {
        type: Number
    },
    products: {
        type: Schema.Types.ObjectId,
        ref: 'Products'
    },
    soldAt: {
        type: Date,
        default: Date.now()
    }

});


module.exports = mongoose.model('Sales', saleSchema);