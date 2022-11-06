const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Cryptr = require("cryptr");
const SecretKey = "secretKey";
const passConverter = new Cryptr(SecretKey);

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: passConverter.encrypt(req.body.password),
      name: req.body.name,
      birthdate: req.body.birthdate,
    });

    const token = jwt.sign(
      { username: newUser.username, email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET
    );

    newUser.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const user = await User.find({});

    res.status(200).json({
      status: "success",
      result: user.length,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const del = await User.findByIdAndDelete(req.params.id);
    console.log(del._id !== "", "kkkkkkkkkkkkkkkkkkkk");
    if (del._id) {
      return res.status(204).json({
        status: "success",
        message: "success to delete user",
      });
    }
    return res.status(404).send({ message: "failed to delete user" });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(204);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
