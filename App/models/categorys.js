const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Products = require('./products');


const categorySchema = new Schema ({
    name: {
        type: String,
        unique: true
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Category',categorySchema);