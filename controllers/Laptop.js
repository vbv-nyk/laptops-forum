const express = require("express");
const mongoose = require("mongoose");
const checkAuth = require("../middlewares/checkAuth");
const Laptop = require("../models/Laptop");

const LaptopRouter = express.Router();

LaptopRouter.post("/", checkAuth, async (req, res) => {
    console.log(req.session);
    const { name, price, link, inStock } = req.body;
    const createdBy = req.session.username;
    const laptop = await Laptop.create({ name, price, link, inStock, createdBy });
    res.send(laptop);
})

LaptopRouter.get("/", checkAuth, async (req, res) => {
    const Laptops = await Laptop.find({});
    res.send(Laptops);
})

LaptopRouter.get("/:id", checkAuth, async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    if (!mongoose.isValidObjectId(id)) {
        return res.send({
            name: "Not valid object ID"
        })
    }
    const laptop = await Laptop.findById(id);
    if (laptop) {
        return res.send(laptop);
    };
    res.send({ name: "No Laptop with this id" })
});


LaptopRouter.put("/:id", checkAuth, async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const { name, price, link, inStock } = req.body;
    if (!mongoose.isValidObjectId(id)) {
        return res.send({
            name: "Not valid object ID"
        })
    }
    const laptop = await Laptop.findByIdAndUpdate(id, { name, price, link, inStock });
    if (laptop) {
        return res.send(laptop);
    };
    res.send({ name: "No Laptop with this id" })
});

LaptopRouter.delete("/:id", checkAuth, async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.send({
            name: "Not valid object ID"
        })
    }
    const laptop = await Laptop.findByIdAndDelete(id);
    if (laptop) {
        return res.send(laptop);
    };
    res.send({ name: "No Laptop with this id" })
});

module.exports = LaptopRouter;