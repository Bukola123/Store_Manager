const { validationResult } = require('express-validator');

const Product = require('../../models/products');
const Cart = require('../../models/carts');
const User = require('../../models/users');


exports.addCart = async (req, res) => {
    try {
        /*const { productId } = req.params;
        console.log(productId);*/
        const product = await Product.findById(req.params.productId);
        let {quan }= req.body;

        let quantity = Number(quan);
        console.log(quantity);

        console.log(product);
        
        if (!product) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Product not found' }] });
        };

         

        //check if qty pick is less or equal to available qty
        const  stock = product.qty;
        const price = product.price;


        if( quantity > stock ){
            return res.status(400).json({
                errors: [{ msg: `Quantity requested not available, only ${stock} is left ` }]
            });

        };
        const amt = quantity * price

        console.log(`Your amount is ${amt}`);
        const use = await User.findById(req.user.id);
        console.log(user);
        console.log('what is happening')
        let cart;
        try {
            cart = await Cart.findOneAndUpdate(
                { user: req.user._id },
                { $set: { ...req.body, updatedAt: Date.now() } },
                { new: true }
            )
                .select('-__v')
                .select('-user');
        } catch (err) {
            res.status(500).send('Internal Server Error');
        }

        return res.status(200).json(cart);

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                errors: [{ msg: 'Invalid product id' }]
            });
        }
        res.status(500).json({ errors: [{ msg: error  }] });
        //res.status(500).json({ errors: [{ msg: err /*'Internal server error'*/ }] });
    }


};








        /*const catalog = Cart({
            products: product._id,
            quantity: quantity,
            price: price,
            amount: amt,
            
        });
        
    
        // save the cart
        try {
            await catalog.save();
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({ message: 'Server error' });
        }

        res.status(200).json(Cart);*/

        
        