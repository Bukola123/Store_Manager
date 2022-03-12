const { unlink } = require('fs/promises');
const { validationResult } = require('express-validator');  
const cloudinary = require('cloudinary').v2;

const Product = require('../../models/products');



exports.getProduct = async (req, res) => {
    
    try {
        const product = await Product.findById(req.params.id)
        return res.json(product);
    } catch (err) {
        
        return res.status(500).json({ errors: [{ msg: 'Internal server error'  }] });
    }
    
};




exports.getAllProduct = async (req, res) => {
    
    try {
        const product = await Product.find().populate( );
        res.json(product);
    } catch (err) {
        res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
};



exports.updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let {name,price,stock,Description} = req.body;
    pro = await Product.findById(req.params.id );
    let quantity = pro.qty;
    let newStock = Number(stock) + quantity
        



    let product;
    try {
        product = await Product.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { ...name,price,qty:newStock,Description, updatedAt: Date.now() } },
            { new: true }
        )
            .select('-__v')
            .select('-category');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }

    
   
    if (req.file) {
        // check that provided file is an image
        if (!req.file.originalname.endsWith('jpeg') && !req.file.originalname.endsWith('jpg')) {
            await unlink(`${req.file.path}`);
            return res
                .status(400)
                .json({ errors: [{ msg: 'Please upload a valid jpeg file' }] });
        }

        // upload image to cloudinary
        try {
            const avatar = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'image',
                public_id: `store-manager/products/${product._id}}/images`,
                overwrite: true
            });
            product.avatar = avatar.secure_url;
            product.save();
            // delete old avatar
            await unlink(`${req.file.path}`);
        } catch (error) {
            console.log(error)
            return res
                .status(500)
                .json({ errors: [{ msg: 'Error uploading image' }] });
        }
    };

    
    
    
   

    return res.status(200).json(product);
};


