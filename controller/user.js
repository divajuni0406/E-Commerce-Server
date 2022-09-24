const Users = require("../models/User");
const Cryptr = require("cryptr");
const SecretKey = "secretKey";
const passConverter = new Cryptr(SecretKey);
const JWT = require("jsonwebtoken");

const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

exports.loginPost = async (req, res) => {
  const { username, password } = req.body;
  let findUser = await Users.findOne({ username });
  if (!findUser) {
    res.status(400).send({ message: "Failed to login. Invalid Username or Password", statusCode: 400 });
  } else {
    try {
      if (passConverter.decrypt(findUser.password) === password) {
        let createToken = JWT.sign(
          {
            id: findUser._id,
            username: findUser.username,
            email: findUser.email,
            role: findUser.role,
          },
          process.env.JWT_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        res.send({
          message: `Welcome ${findUser.username}`,
          sendData: {
            id: findUser.id,
            username: findUser.username,
            email: findUser.email,
            token: createToken,
            role: findUser.role,
          },
          statusCode: 200,
        });
      } else {
        res.status(400).send({ message: "Failed to login. Invalid Username or Password", googleMessage: "Sorry, please register your account", statusCode: 400 });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
};

exports.socialLogin = async (req, res) => {
  const { email, password } = req.body;
  let findUser = await Users.findOne({ email });
  if (!findUser) {
    res.status(400).send({ message: "Sorry, your account hasn't register yet", statusCode: 400 });
  } else {
    try {
      if (passConverter.decrypt(findUser.password) === password) {
        let createToken = JWT.sign(
          {
            id: findUser._id,
            username: findUser.username,
            email: findUser.email,
            role: findUser.role,
          },
          process.env.JWT_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        res.send({
          message: `Welcome ${findUser.username}`,
          sendData: {
            id: findUser.id,
            username: findUser.username,
            email: findUser.email,
            token: createToken,
            role: findUser.role,
          },
          statusCode: 200,
        });
      } else {
        res.status(400).send({ message: "Sorry, please register your account", statusCode: 400 });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
};

exports.forgotPassword = async (req, res) => {
  let { email, password } = req.body;
  const userEmail = await Users.findOne({ email });
  console.log(userEmail);
  if (!userEmail) {
    res.status(400).send({ message: "Please input your email correctly", statusCode: 400 });
  } else {
    try {
      const updateUserPassword = await Users.updateOne({ email }, { $set: { password: passConverter.encrypt(password) } });
      res.send({ message: "Successfull to update your password", statusCode: 200, result: updateUserPassword });
    } catch (error) {
      res.status(500).send(error.message);
      console.log(error);
    }
  }
};


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
