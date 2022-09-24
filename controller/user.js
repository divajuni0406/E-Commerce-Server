const Users = require("../models/User");
const Cryptr = require("cryptr");
const SecretKey = "secretKey";
const passConverter = new Cryptr(SecretKey);

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