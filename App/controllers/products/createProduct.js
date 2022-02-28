const { unlink } = require('fs/promises');
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;

const Product = require('../../models/products');
const Category = require('../../models/categorys');


//creating a product
exports.createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name , Description,price,qty} = req.body;
    const category = req.params.categoryId;
    

    const cat = await Category.findById(category);
    if (!cat) {
        return res.status(401).json({ msg: 'Invalid credentials' });
    }
    
    const product = new Product({
        name,
        Description,
        price,
        qty,
        category
    });
   

    // save the product
    try {
        await product.save();
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                errors: [{ msg: 'Product already exists' }]
            });
        }
        return res.status(500).json({ msg:'Internal server error' });
    };

    if (!cat.products.includes(product._id)){
        cat.products.push(product._id);
        
        
        
    }


    if (req.file) {
        // check that provided file is an image
        if (!req.file.originalname.endsWith('jpg')) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Please upload a valid jpg file' }] });
        }

        // upload image to cloudinary
        try {
            const avatar = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'image',
                public_id: `store-manager/products/${req.Product.id}}/images`,
                overwrite: true
            });
            req.body.avatar = avatar.secure_url;
            // delete old avatar
            await unlink(`${req.file.path}`);
        } catch (error) {
            return res
                .status(500)
                .json({ errors: [{ msg: 'Error uploading image' }] });
        }
    };


    
    

        return res.status(200).json(product);
};
