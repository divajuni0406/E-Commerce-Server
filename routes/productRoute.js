const route = require('express').Router()
const { getAllProduct, createProduct, getProductById, deleteProduct } = require('../controller/ProductController')
// authorization belum buat
route.get('/api/product', getAllProduct)
route.post('/api/create-product', createProduct)
route.get('/api/product/:id', getProductById)
route.delete('/api/delete-product/:id', deleteProduct)


module.exports = route