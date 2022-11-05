const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

exports.authPage = (req, res) => {
  res.render("auth");
};

exports.authApiGeneral = async (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let authToken = authHeader && authHeader.split(" ")[1];
  if (!authToken || authToken === null || authToken === "") {
    return res.status(401).redirect(401, "/authorization");
  }
  try {
    let user = await JWT.verify(authToken, process.env.JWT_TOKEN_SECRET);
    if (user.role === "user" || user.role === "admin") {
      return next();
    } else {
      return res.status(401).redirect("/authorization");
    }
  } catch (error) {
    return res.status(401).redirect("/authorization");
  }
};

exports.authApiAdmin = async (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let authToken = authHeader && authHeader.split(" ")[1];
  console.log("sfdfdfdfdfdfdfd", authToken);
  if (!authToken || authToken === null || authToken === "") {
    console.log("assasassa");
    return res.status(401).redirect("/authorization");
  }
  try {
    let authApi = await JWT.verify(authToken, process.env.JWT_TOKEN_SECRET);
    console.log(authApi.role === "admin", "llllllllllllllllllllllllllllll");
    if (authApi.role == "admin") {
      return next();
    }
    return res.status(401).redirect("/authorization");
  } catch (error) {
    return res.status(401).redirect("/authorization");
  }
};
