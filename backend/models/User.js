const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: {
    pincode: String,
    city: String,
    state: String,
    fullAddress: String,
  },
});

module.exports = mongoose.model("User", userSchema);
