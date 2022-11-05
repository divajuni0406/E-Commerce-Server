const router = require('express').Router();
const AuthController = require('../controller/AuthController');

router.post('/api/user/signup', AuthController.signup);
router.get('/api/user', AuthController.getUsers);
router.delete('/api/user/:id', AuthController.deleteUser);

module.exports = router;
