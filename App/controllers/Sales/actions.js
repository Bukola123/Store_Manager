const { validationResult } = require('express-validator');

const Product = require('../../models/products');
const Cart = require('../../models/carts');


exports.addCart = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        const quantity = req.body;
        console.log(product);
        if (!product) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Product not found' }] });
        };
        
        /*const cart = await Cart.findById(req.product.category);
        console.log(cart);

        

        /*if (cart.product.includes(product._id)) {
            return res.status(400).json({
                errors: [{ msg: 'Product already added to cart' }]
            });
        }*/

        
        

        //check if qty pick is less or equal to available qty
        const  stock = product.qty;
        const price = product.price;

        console.log(stock);
        console.log(price);

        if(! quantity > stock ){
            return res.status(400).json({
                errors: [{ msg: 'Quantity requested not available' }]
            });

        };
        const amt = quantity * price

        console.log(`Your amount is ${amt}`);

        const catalog = new Cart({
            products:product,
            quantity: quantity,
            price: price,
            amount: amt,
            
        });
    
        // save the cart
        try {
            await catalog.save();
        } catch (err) {
            if (err.code == 11000) {
                return res.status(400).json({
                    errors: [{ msg: 'Cart already exists' }]
                });
            }
            return res.status(500).json({ msg: err /*'Internal server error'*/ });
        }
        res.status(200).json(cart);

        
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