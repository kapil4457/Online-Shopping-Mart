const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
app.use(cookieParser());


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const product  = require('./routes/productRoute')
const user  = require('./routes/userRoute')
const order  = require('./routes/orderRoute')
const payment  = require('./routes/paymentRoute')


app.use("/api/v1/", product);
app.use("/api/v1/", user);
app.use("/api/v1/", order);
app.use("/api/v1/", payment);


// app.use(express.static(path.join(__dirname, "../frontend/build")));


module.exports = app;
