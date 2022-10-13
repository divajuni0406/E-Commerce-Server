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
const { Cart } = require("../models");

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
  let { userId, total_order, carts } = req.body;
  try {
    const cart = await Cart.findOne({ userId: userId, status: "unpaid" });
    await Cart.updateOne({ _id: cart._id, status: "unpaid" }, { $set: { status: "paid" } });

    const order = await Order.create({ userId, total_order });
    const updateCart = carts.map((val) => {
      val.subTotal = val.quantity * val.product[0].price;
      val.orderId = order._id;
      val.price = val.product[0].price;
      delete val.cartId;
      delete val.product;
      delete val.timestamp;
      return val;
    });

    let postOrderDetail = updateCart.map((val) => OrderDetail.create(val));

    Promise.all(postOrderDetail)
      .then((result) => {
        res.send({
          statusCode: 200,
          message: "successfull to create your order",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
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
  console.log("ytsddf", userId);
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
    if (transactionHistoryDetail) {
      res.send({
        statusCode: 200,
        message: "successfull to get your transaction history detail",
        result: transactionHistoryDetail,
      });
    } else {
      res.status(400).send({ message: "failed to get your transaction history detail", statusCode: 400 });
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};
