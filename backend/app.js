const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
app.use(cookieParser());
var cors = require('cors')



app.use(cors())
app.use(express.json({limit:'50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({  
    limit:'50mb' ,
extended: true ,
 parameterLimit:50000}));


const product  = require('./routes/productRoute')
const user  = require('./routes/userRoute')
const order  = require('./routes/orderRoute')


app.use("/api/v1/", product);
app.use("/api/v1/", user);
app.use("/api/v1/", order);


// app.use(express.static(path.join(__dirname, "../frontend/build")));


module.exports = app;
