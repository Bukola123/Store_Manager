const { validationResult } = require('express-validator');


const Sales = require('../../models/sales');
const Customer = require('../../models/customer');
const Product = require('../../models/products');


//creating a product
exports.makeSales = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name , phone,products, quan} = req.body;
    

    
    const customer = new Customer({
        name:name,
       phone:phone
    });
   

    // save the customer
    try {
        await customer.save();
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                errors: [{ msg: 'Sales already made' }]
            });
        }
        return res.status(500).json({ msg: 'Internal server error' });
    };
    for(let i = 0; i < products.length;i++){

        const product = await Product.findById(products[i]);
        let quantity = Number(quan[i]);

        if (!product) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Product not found' }] });
        };

         

        //check if qty pick is less or equal to available qty
        
        const amt = product.price;
        const  stock = product.qty;

        if( quantity > stock ){
            return res.status(400).json({
                errors: [{ msg: `Quantity requested not available, only ${stock} is left ` }]
            });

        };
        const price = quantity * amt

        }

        const sales = new Sales({
            customer: customer.id,
            attendant: req.user.id,
            price: price,
            products:products
        });
    
        // save the user
        try {
            await sales.save();
        } catch (err) {
            if (err.code == 11000) {
                return res.status(400).json({
                    errors: [{ msg: 'Sales already processed' }]
                });
            }
            return res.status(500).json({ msg: 'Internal server error' });
        }
    
    
    

};