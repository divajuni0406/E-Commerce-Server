const express = require("express");
const route = express.Router();
const { authApiGeneral } = require('../controller/authorizeRoutes')
const { transactionHistoryPost, transactionHistory, transactionHistoryDetail, forgotPassword, socialLogin, loginPost } = require("../controller/user");

route.post("/loginData", loginPost);
route.post("/socialLogin", socialLogin);

route.post("/forgotPassword", forgotPassword);

route.get("/transactionHistoryDetail/:id", authApiGeneral, transactionHistoryDetail);
route.get("/transactionHistory/:id", authApiGeneral, transactionHistory);
route.post("/transactionHistoryPost", authApiGeneral, transactionHistoryPost);

module.exports = route;
