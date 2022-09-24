const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

exports.transactionHistoryPost = async (req, res) => {
  let { userId, price, quantity, productId, total_order, subTotal } = req.body;
  try {
    const order = await Order.create({ userId, total_order });
    console.log(order.id);
    const orderDetail = await OrderDetail.create({ orderId: order.id, productId, price, quantity, subTotal });
    res.send({
      statusCode: 200,
      message: "successfull to create your order",
      result: { order, orderDetail },
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
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
        "$project": {
          "user.password": 0
        }
      }
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
  let orderId = req.params.id;
  try {
    const transactionHistoryDetail = await OrderDetail.aggregate([
      { $match: { orderId: ObjectId(orderId) } },
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
    ]);
    res.send({
      statusCode: 200,
      message: "successfull to get your transaction history",
      result: transactionHistoryDetail,
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};