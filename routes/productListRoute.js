const router = require('express').Router();
const { ProductListController } = require('../controller/ProductListController');

router.get('/api/products', ProductListController);

module.exports = router;