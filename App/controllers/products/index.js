const {createProduct} = require('./createProduct');
const {updateProduct, getAllProduct, getProduct} = require('./updateProducts');
const { deleteProduct} = require('./deleteProduct');
const { addBulkProduct} = require('./addBulk');





module.exports = {
    createProduct,
    updateProduct,
    getAllProduct,
    getProduct,
    deleteProduct,
    addBulkProduct
};
