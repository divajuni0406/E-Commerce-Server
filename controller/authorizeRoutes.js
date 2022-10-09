const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

exports.authApiGeneral = async (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let authToken = authHeader && authHeader.split(" ")[1];
  console.log("dsdsdsds", authToken);
  if (!authToken) {
    return res.status(400).send({statusCode: 400});
  }
  try {
    let user = await JWT.verify(authToken, process.env.JWT_TOKEN_SECRET);
    if (user.role === "user" || user.role === "admin") {
      return next();
    } else {
      return res.status(400).send({statusCode: 400});
    }
  } catch (error) {
    return res.status(401).send({ message: "Invalid Token" });
  }
};

exports.authApiAdmin = async (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let authToken = authHeader && authHeader.split(" ")[1];
  if (!authToken) {
    return res.status(400);
  }
  try {
    let authApi = await JWT.verify(authToken, process.env.JWT_TOKEN_SECRET);
    if (authApi.role == "admin") {
       return next();
    }
    return res.status(400);
  } catch (error) {
    return res.status(400);
  }
};
