const express = require("express");
const route = express.Router();
const {authPage} = require('../controller/authorizeRoutes')

route.get("/authorization", authPage);

module.exports = route;