const router = require('express').Router();
const AuthController = require('../controller/AuthController');

router.post('/api/user/signup', AuthController.signup);

module.exports = router;
