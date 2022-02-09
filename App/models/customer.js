const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const customerSchema = new Schema ({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    sales: {
        type: Schema.Types.ObjectId,
        ref: 'Sales'
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }
});


module.exports = mongoose.model('Customer',customerSchema);