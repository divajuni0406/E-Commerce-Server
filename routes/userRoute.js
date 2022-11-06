const router = require("express").Router();
const AuthController = require("../controller/AuthController");
const { authApiAdmin } = require("../controller/authorizeRoutes");

router.post("/api/user/signup", AuthController.signup);
router.get("/api/user", authApiAdmin, AuthController.getUsers);
router.delete("/api/user/:id", authApiAdmin, AuthController.deleteUser);

module.exports = router;
