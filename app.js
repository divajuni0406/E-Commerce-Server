const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const router = require('./routes/index');
const mongoConnect = require('./config/mongodb').main;

const app = express();
const port = process.env.port || 5000;
dotenv.config();

// Morgan
app.use(morgan('dev'));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use(router);

// Mongo Connection
mongoConnect();

// Run Server
app.listen(port, () => {
    console.log(`listen on port ${port}`);
});
