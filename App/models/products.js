const res = require('express/lib/response');
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const Schema = mongoose.Schema;
const Category = require('./categorys')



const productSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    images: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

// create profile after user is created
productSchema.post('save', async function (doc, next) {
    const category = await Category.findById( doc.category );
    
    if (!category.products.includes(doc._id)){
        category.products.push(doc._id);

        category.save();
        
        
    }
    
    next();    

});



module.exports = mongoose.model('Products', productSchema);
