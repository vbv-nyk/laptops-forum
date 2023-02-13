const express = require("express");
const expressSession = require("express-session");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const checkLoggedIn = require("../middlewares/checkLoggedIn");
const checkAuth = require("../middlewares/checkAuth");

const userRouter = express.Router();

userRouter.get("/:username", async (req, res) => {
    const { username } = req.params.username;
    const user = await User.find({ username });
    res.send(user);
})

userRouter.get("/", async (req, res) => {
    const user = await User.find({});
    res.send(user);
})

userRouter.post("/signup", checkLoggedIn, async (req, res) => {
    const { firstName, username, lastName, password, laptopsOwned } = req.body;
    const checkUsername = await User.find({ username });
    console.log(checkUsername);
    if (checkUsername.length > 0) {
        return res.send({
            error: "Username already taken",
        })
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    let user = await User.create({ firstName, username, lastName, "password": hashedPassword, laptopsOwned });
    const userId = user._id.toString();
    user = await User.findById(userId).populate({ path: "laptopsOwned", select: ["name", "link"] })
    res.send(user);
});

userRouter.post("/login", checkLoggedIn, async (req, res) => {

    const { username, password } = req.body;
    const checkUsername = await User.findOne({ username });
    console.log(checkUsername);
    if (!checkUsername)
        return res.send({ error: "Invalid username or password" });
    const passMatch = await bcrypt.compare(password, checkUsername.password);
    if (passMatch) {
        req.session.loggedIn = true;
        req.session.username = checkUsername.username;
        return res.send(req.session);
    } else {
        return res.send("Invalid username or password");
    }
})
userRouter.put("/update/:username", checkAuth, async (req, res) => {
    const { username } = req.params;
    const { firstName, lastName, password, laptopsOwned } = req.body;
    const checkUsername = await User.findOne({ "username": username });
    console.log(checkUsername);
    if (!checkUsername)
        return res.send({ error: "User not found" });
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.findByIdAndUpdate(checkUsername._id, { firstName, username, lastName, "password": hashedPassword, laptopsOwned });
    res.send(user);
})
module.exports = userRouter;
