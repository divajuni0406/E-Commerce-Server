const express = require("express");
const route = express.Router();
<<<<<<< HEAD
const { socialLogin, loginPost } = require("../controller/user");

route.post("/loginData", loginPost);
route.post("/socialLogin", socialLogin);
=======
const { forgotPassword } = require("../controller/user");

route.post("/forgotPassword", forgotPassword);
>>>>>>> origin/api-forgotPassword

module.exports = route;
