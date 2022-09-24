const express = require("express");
const route = express.Router();
const { forgotPassword } = require("../controller/user");

route.post("/forgotPassword", forgotPassword);

module.exports = route;
