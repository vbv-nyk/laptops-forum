require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
var bodyParser = require('body-parser')

const LaptopRouter = require("./controllers/Laptop");
const userRouter = require("./controllers/User");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODBURL);

app.use("/Laptops", LaptopRouter);
app.use("/Users", userRouter);

app.use("/", (req, res) => {
    res.send("Hello world");
})

app.listen(process.env.PORT);