const router = require('express').Router();
const { ProductListController } = require('../controller/ProductListController');

router.get('/products', ProductListController);

module.exports = router;