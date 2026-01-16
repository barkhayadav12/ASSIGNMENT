const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],

    totalAmount: Number,

    address: {
      pincode: String,
      city: String,
      state: String,
      fullAddress: String,
    },

    paymentMethod: String,

    status: {
      type: String,
      default: "Placed",
      enum: ["Placed", "Shipped", "Out for Delivery", "Delivered"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
