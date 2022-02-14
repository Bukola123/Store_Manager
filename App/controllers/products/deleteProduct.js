const Product = require('../../models/products');
const Category = require('../../models/categorys');

exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;
    
    

    const pro = await Product.findById(productId);
    
    const cat = await Category.findById(pro.category);

    let product;
    try {
        product = await Product.deleteOne({
            _id: productId
        });

        if (cat.products.includes(pro._id)){

            
            await cat.products.pull(pro._id);
            await cat.save();
            
        }
                

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
