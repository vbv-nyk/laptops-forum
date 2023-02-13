require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
var bodyParser = require('body-parser')

const LaptopRouter = require("./controllers/Laptop");
const userRouter = require("./controllers/User");

const app = express();

app.use(session({
    secret: process.env.USERLOGIN,
    resave: false,
    saveUninitialized: true,
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODBURL);

app.use("/Laptops", LaptopRouter);
app.use("/Users", userRouter);

app.use("/", (req, res) => {
    res.send({ error: "Not logged in yet" });
})

app.listen(process.env.PORT);