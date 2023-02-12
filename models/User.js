const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, minLength: 3, maxLength: 12 },
    firstName: { type: String, required: true, minLength: 3, maxLength: 15, trim: true },
    lastName: { type: String, required: true, minLength: 3, maxLength: 15, trim: true },
    password: { type: String, required: true },
    joined: { type: Date, default: Date.now },
    laptopsOwned: [{ type: Schema.Types.ObjectId, ref: "Laptop" }]
})

const User = mongoose.model("User", UserSchema);

module.exports = User;