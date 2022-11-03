const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
const cors = require("cors");
const mongoConnect = require("./config/mongodb").main;

const app = express();
const port = process.env.port || 5000;
dotenv.config();

app.set("view engine", "ejs");
// Cors
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use(router);

// Mongo Connection
mongoConnect();

// // Run Server
// app.listen(port, () => {
//   console.log(`listen on port ${port}`);
// });

if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(`listen on port ${port}`);
    });
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

module.exports = app;
