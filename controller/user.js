const Users = require("../models/User");
const Cryptr = require("cryptr");
const SecretKey = "secretKey";
const passConverter = new Cryptr(SecretKey);
const JWT = require("jsonwebtoken");

const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
const { resetPasswordVerif } = require("../helper/mailer");
const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const { Cart } = require("../models");

exports.loginPost = async (req, res) => {
  const { username, password } = req.body;
  let findUser = await Users.findOne({ username });
  if (!findUser) {
    res.status(400).send({
      message: "Failed to login. Invalid Username or Password",
      statusCode: 400,
    });
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
        res.status(400).send({
          message: "Failed to login. Invalid Username or Password",
          statusCode: 400,
        });
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
    res.status(400).send({
      message: "Sorry, your account hasn't register yet",
      statusCode: 400,
    });
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
        res.status(400).send({
          message: "Sorry, please register your account",
          statusCode: 400,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
};

exports.forgotPassword = async (req, res) => {
  let { tokenResetPassword, password } = req.body;
  const userToken = await Users.findOne({
    tokenResetPassword: tokenResetPassword,
  });
  console.log(userToken);
  if (!userToken) {
    res.status(400).send({ message: "Invalid token", statusCode: 400 });
  } else {
    try {
      const updateUserPassword = await Users.updateOne(
        { tokenResetPassword },
        { $set: { password: passConverter.encrypt(password) } }
      );
      res.send({
        message: "Successfull to update your password",
        statusCode: 200,
        result: updateUserPassword,
      });
    } catch (error) {
      res.status(500).send(error.message);
      console.log(error);
    }
  }
};

exports.forgotPasswordVerification = async (req, res) => {
  let { email } = req.body;
  try {
    const findUser = await Users.findOne({ email });
    if (findUser) {
      const token = JWT.sign(
        {
          userId: findUser._id,
        },
        process.env.JWT_TOKEN_SECRET
      );
      await findUser.updateOne({ tokenResetPassword: token });
      let name = email.substring(0, email.lastIndexOf("@"));
      const templateEmail = {
        from: "Sober Team <idhamdummy1@gmail.com>",
        to: email,
        subject: "Link To Reset Password",
        html: `<p>Dear Mr/Mrs/Ms ${name} Please Click Link Below to Reset Your Password</p> <p>${process.env.CLIENT_URL}/resetPassword/${token}`,
      };
      const resetPass = await resetPasswordVerif(templateEmail);
      if (resetPass) {
        return res.status(200).send({
          message: "Link To Reset Password Has Been Sent Successfully",
        });
      }
      return res
        .status(400)
        .send({ message: "Link To Reset Password Failed to Sent" });
    }
    return res
      .status(400)
      .send({ message: "Sorry your email hasn't register yet" });
  } catch (error) {
    console.log(error);
  }
};
// BELUM
exports.transactionHistoryPost = async (req, res) => {
  let { userId, total_order, carts } = req.body;
  try {
    const cart = await Cart.findOne({ userId: userId, status: "unpaid" });
    console.log(
      cart,
      "lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"
    );
    if (!cart || undefined) {
      return res
        .status(400)
        .send({ message: "don't have any carts", result: null });
    }
    await Cart.updateOne(
      { _id: cart._id, status: "unpaid" },
      { $set: { status: "paid" } }
    );

    const order = await Order.create({ userId, total_order });
    console.log(
      carts,
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    );
    const updateCart = carts.map((val) => {
      console.log(val, "kkkkkkkkkkkkkkkk");
      val.subTotal = val.quantity * val.product[0].price;
      val.orderId = order._id;
      val.price = val.product[0].price;
      delete val.cartId;
      delete val.product;
      delete val.timestamp;
      return val;
    });

    let postOrderDetail = updateCart.map((val) => OrderDetail.create(val));
    console.log(postOrderDetail, "akakakakakakak");
    if (!postOrderDetail) {
      res.status(400).send({ message: "failed to create your order history" });
    } else {
      Promise.all(postOrderDetail)
        .then((result) => {
          console.log(result, "jjjjjjjjjjjjjjjjjjjj");
          res.send({
            statusCode: 200,
            message: "successfull to create your order",
            result: result,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

exports.transactionHistory = async (req, res) => {
  let userId = req.params.id;
  const users = await Users.findById({ _id: userId });
  console.log(
    userId,
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
  );
  if (!users) {
    return res.status(400).send({ message: "user not found" });
  }
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
    if (transactionHistory.length > 0) {
      res.send({
        statusCode: 200,
        message: "successfull to get your transaction history",
        result: transactionHistory,
      });
    } else if (transactionHistory.length === 0) {
      res.status(404).send({
        message: "you don't have any transaction histories yet",
        statusCode: 404,
      });
    } else {
      res.status(400).send({
        message: "failed to get transaction histories, something wrong!",
        statusCode: 400,
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

exports.transactionHistoryDetail = async (req, res) => {
  let userId = req.params.id;
  const users = await Users.findById({ _id: userId });
  if (!users) {
    return res.status(400).send({ message: "user not found" });
  }
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
    if (transactionHistoryDetail.length > 0) {
      res.send({
        statusCode: 200,
        message: "successfull to get your transaction history detail",
        result: transactionHistoryDetail,
      });
    } else if (transactionHistoryDetail.length === 0) {
      res.status(404).send({
        message: "you don't have any transaction histories yet",
        statusCode: 404,
      });
    } else {
      res.status(400).send({
        message: "failed to get transaction histories, something wrong!",
        statusCode: 400,
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};
