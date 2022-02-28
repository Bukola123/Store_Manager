const { validationResult } = require('express-validator');

const Product = require('../../models/products');
const Cart = require('../../models/carts');
const User = require('../../models/users');


exports.addCart = async (req, res) => {
    
    try {
        
        const product = await Product.findById(req.params.productId);
        let {quan }= req.body;

        let quantity = Number(quan);
        
        
        if (!product) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Product not found' }] });
        };


        if( quantity > stock ){
            return res.status(400).json({
                errors: [{ msg: `Quantity requested not available, only ${stock} is left ` }]
            });

        };
        const amt = quantity * price

        
               
        
        let cart;
        try {
            cart = await Cart.findOneAndUpdate(
                { user: req.user.id },
                { $set: { ...req.body, updatedAt: Date.now() } },
                { new: true }
            )
                .select('-__v')
                .select('-user');
        } catch (err) {
            return res.status(500).json({ errors: [{ msg: error  }] });
        }

        return res.status(200).json(cart);

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                errors: [{ msg: 'Invalid product id' }]
            });
        }
        return res.status(500).json({ errors: [{ msg: error  }] });
        
    }


};


