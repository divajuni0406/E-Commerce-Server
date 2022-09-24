const Users = require("../models/User");
const Cryptr = require("cryptr");
const SecretKey = "secretKey";
const passConverter = new Cryptr(SecretKey);
const JWT = require("jsonwebtoken");
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
