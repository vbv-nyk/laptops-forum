const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: { type: String, required: true, minLength: 5, maxLength: 15, trim: true },
    lastName: { type: String, required: true, minLength: 5, maxLength: 15, trim: true },
    password: { type: String, required: true, },
    joined: { type: Date, default: Date.now },
    laptopsOwned: [{ type: Schema.Types.ObjectId, ref: "Laptop" }]
})

const User = mongoose.model("User", UserSchema);

module.exports = User;