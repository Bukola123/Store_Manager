const { unlink } = require('fs/promises');
const { validationResult } = require('express-validator');  
const cloudinary = require('cloudinary').v2;

const Product = require('../../models/products');



exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product);
    } catch (err) {
        res.status(500).json({ errors: [{ msg: err  }] });
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
                public_id: `store_Manager/products/${req.product.id}}/images`,
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
    }

    let product;
    try {
        product = await Product.findOneAndUpdate(
            { _id : req.params.id },
            { $set: { ...req.body, updatedAt: Date.now() } },
            { new: true }
        )
            .select('-__v')
            .select('-category');

    } catch (err) {
        //res.status(500).send('Internal Server Error');
        return res.status(500).json({ msg: err /*'Internal server error' */});
    }
    console.log(product);
   

    return res.status(200).json(product);
};


