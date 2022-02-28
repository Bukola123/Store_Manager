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
    let product = "";
    let quantity = "";
    let price = [];
    let totalPrice = 0;
    
    for(let i = 0; i < products.length;i++){

        product = await Product.findById(products[i]);
        quantity = Number(quan[i]);
        const amt = product.price;
        newPrice = Number(quantity * amt)
        price.push(newPrice);

    }

    for(let i = 0;i < price.length;i++){
        totalPrice += price[i];
     
    } 
    if (!product) {
        return res
            .status(404)
            .json({ errors: [{ msg: 'Product not found' }] });
    };

        

    //check if qty pick is less or equal to available qty
    
    
    const  stock = product.qty;
    

    if( quantity > stock ){
        return res.status(400).json({
            errors: [{ msg: `Quantity requested not available, only ${stock} is left ` }]
        });

    };
                
    
    const sales = new Sales({
        customer: customer.id,
        attendant: req.user.id,
        products:products,
        quantity: quan,
        prices: price,
        totalPrice
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
        return res.status(500).json({ msg:'Internal server error'});
    };
    


return res.status(200).json({msg:sales});


}; 



exports.getAllSales = async (req, res) => {
    
    try {
        const sales = await Sales.find().populate( );
        res.json(sales);
    } catch (err) {
        res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
};



exports.getSalesByAttendant = async (req, res) => {
    
    const attendant = req.body;
    console.log(attendant)
    
    try {
        const sales = await Sales.find(attendant).populate( );
        res.json(sales);
    } catch (err) {
        res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
};


exports.getSale = async (req, res) => {
    
    const id = req.params.id;
    
    try {
        const sales = await Sales.findById(id);
        res.json(sales);
    } catch (err) {
        res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
};