const route = require('express').Router();
const {
    getAllProduct,
    createProduct,
    getProductById,
    deleteProduct,
    findProductCategory,
    searchProduct,
    updateImgProduct,
} = require('../controller/ProductController');
const { authApiAdmin } = require('../controller/authorizeRoutes');

route.get('/api/product', getAllProduct);
route.post('/api/productCategory', findProductCategory);
route.post('/api/searchProduct', searchProduct);
route.post('/api/create-product', createProduct);
route.get('/api/product/:id', getProductById);
route.patch('/api/edit-data/:id', updateImgProduct);
route.delete('/api/delete-product/:id', authApiAdmin, deleteProduct);

module.exports = route;
