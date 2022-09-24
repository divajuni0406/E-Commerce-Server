const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const port = process.env.port || 5000;
const router = require("./routes/index");

app.set("view engine", "ejs");

app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});

const ConnectionMongoDB = require("./config/mongodb");
ConnectionMongoDB();
