const mongoose = require("mongoose");

const LaptopSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now, },
    createdBy: { type: String, required: true, trim: true }
})

const Laptop = mongoose.model('Laptop', LaptopSchema);

module.exports = Laptop;