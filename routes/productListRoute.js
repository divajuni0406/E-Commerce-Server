const router = require('express').Router();
const { ProductListController } = require('../controller/ProductListController');
const {authApiGeneral} = require('../controller/authorizeRoutes');

router.get('/api/products', authApiGeneral, ProductListController);

module.exports = router;