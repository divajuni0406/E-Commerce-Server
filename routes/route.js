const express = require("express");
const route = express.Router();
const { transactionHistoryPost, transactionHistory, transactionHistoryDetail } = require("../controller/user");

route.get("/transactionHistoryDetail/:id", transactionHistoryDetail);
route.get("/transactionHistory/:id", transactionHistory);
route.post("/transactionHistoryPost", transactionHistoryPost);

module.exports = route;
