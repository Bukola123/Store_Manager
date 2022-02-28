



exports.getAllProduct = async (req, res) => {
    
    try {
        const product = await Product.find().populate( );
        res.json(product);
    } catch (err) {
        res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
    }
};
