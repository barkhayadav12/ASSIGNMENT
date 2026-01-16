const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");

// PLACE ORDER
router.post("/", async (req, res) => {
  const { address, paymentMethod } = req.body;

  const cartItems = await Cart.find().populate("product");
  if (cartItems.length === 0)
    return res.status(400).json({ msg: "Cart empty" });

  const total = cartItems.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const user = await User.findOne();

  const order = await Order.create({
    user: user._id,
    items: cartItems.map((i) => ({
      product: i.product._id,
      quantity: i.quantity,
    })),
    totalAmount: total,
    address,
    paymentMethod,
    status: "Placed",
  });

  await Cart.deleteMany();

  res.json(order);
});

// GET SINGLE ORDER
router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id).populate("items.product");
  res.json(order);
});

// USER ORDER HISTORY
router.get("/user/orders", async (req, res) => {
  const user = await User.findOne();
  const orders = await Order.find({ user: user._id })
    .populate("items.product")
    .sort({ createdAt: -1 });

  res.json(orders);
});

module.exports = router;
