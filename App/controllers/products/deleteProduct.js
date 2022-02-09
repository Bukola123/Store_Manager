const Product = require('../../models/products');

exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;
    

    let product;
    try {
        product = await Product.deleteOne({
            _id: productId
        });
    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Product not found' }] });
        }
        return res.status(500).json({ errors: [{ msg: 'Server error' }] });
    }

    return res.status(200).json({ msg: 'Product deleted' });
};
