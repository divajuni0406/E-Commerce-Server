const express = require("express");
const route = express.Router();
const { socialLogin, loginPost } = require("../controller/user");

route.post("/loginData", loginPost);
route.post("/socialLogin", socialLogin);

module.exports = route;
