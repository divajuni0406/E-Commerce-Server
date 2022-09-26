const express = require("express");
const route = express.Router();
const { transactionHistoryPost, transactionHistory, transactionHistoryDetail, forgotPassword, socialLogin, loginPost, getuser } = require("../controller/user");

route.post("/loginData", loginPost);
route.post("/socialLogin", socialLogin);

route.post("/forgotPassword", forgotPassword);

route.get("/transactionHistoryDetail/:id", transactionHistoryDetail);
route.get("/transactionHistory/:id", transactionHistory);
route.post("/transactionHistoryPost", transactionHistoryPost);

route.get('/datauser',getuser)

module.exports = route;
