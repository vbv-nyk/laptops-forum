const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    const { firstName, username, lastName, password, laptopsOwned } = req.body;
    const checkUsername = await User.find({ username });
    if (checkUsername.length) {
        res.send({
            error: "Username already exists",
        })
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    let user = await User.create({ firstName, username, lastName, "password": hashedPassword, laptopsOwned });
    const userId = user._id.toString();
    user = await User.findById(userId).populate({ path: "laptopsOwned", select: ["name", "link"] })
    res.send(user);
});

module.exports = userRouter;