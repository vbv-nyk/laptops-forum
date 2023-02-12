const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, password, laptopsOwned } = req.params;
    const hashedPassword = bcrypt.hash(password, 8, bcrypt.genSalt);
    const user = await User.create({ firstName, lastName, hashedPassword, laptopsOwned }).populate('laptopsOwned');
    res.send(user);
});

module.exports = userRouter;