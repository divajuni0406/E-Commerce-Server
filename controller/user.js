const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

exports.transactionHistoryPost = async (req, res) => {
  let { userId, price, quantity, productId, total_order, subTotal } = req.body;
  const findOrder = await Order.findOne({ userId });
  if (findOrder) {
    try {
      const updateOrder = await Order.updateOne({ userId }, { $set: { total_order: findOrder.total_order + total_order } });
      const orderDetail = await OrderDetail.create({ orderId: findOrder.id, productId, price, quantity, subTotal });
      if (updateOrder) {
        res.status(200).send({ message: "successfull to update and create your order", result: { updateOrder, orderDetail }, statusCode: 200 });
      } else {
        res.status(400).send({ message: "failed to update your order", statusCode: 400 });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  } else {
    try {
      const order = await Order.create({ userId, total_order });
      const orderDetail = await OrderDetail.create({ orderId: order.id, productId, price, quantity, subTotal });
      if (order && orderDetail) {
        res.send({
          statusCode: 200,
          message: "successfull to create your order",
          result: { order, orderDetail },
        });
      } else {
        res.status(400).send({ message: "failed to create your order", statusCode: 400 });
      }
    } catch (error) {
      res.status(500).send(error.message);
      console.log(error);
    }
  }
};

exports.transactionHistory = async (req, res) => {
  let userId = req.params.id;
  try {
    const transactionHistory = await Order.aggregate([
      { $match: { userId: ObjectId(userId) } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          "user.password": 0,
        },
      },
    ]);
    res.send({
      statusCode: 200,
      message: "successfull to get your transaction history",
      result: transactionHistory,
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

exports.transactionHistoryDetail = async (req, res) => {
  let userId = req.params.id;
  try {
    const transactionHistoryDetail = await OrderDetail.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "orderId",
          foreignField: "_id",
          as: "order",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "products",
        },
      },
      { $match: { "order.userId": ObjectId(userId) } },
    ]);
    if(transactionHistoryDetail){
      res.send({
        statusCode: 200,
        message: "successfull to get your transaction history detail",
        result: transactionHistoryDetail,
      });
    } else{
      res.status(400).send({message: "failed to get your transaction history detail", statusCode: 400})
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};