const {createProduct} = require('./createProduct');
const {updateProduct, getAllProduct, getProduct} = require('./updateProducts');
const { deleteProduct} = require('./deleteProduct');





module.exports = {
    createProduct,
    updateProduct,
    getAllProduct,
    getProduct,
    deleteProduct
};
