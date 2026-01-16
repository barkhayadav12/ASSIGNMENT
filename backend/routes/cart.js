const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ADD / INCREASE
router.post("/", async (req, res) => {
  const { productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ msg: "Product not found" });

  let item = await Cart.findOne({ product: productId });

  if (item) {
    if (item.quantity >= product.stock) {
      return res.status(400).json({ msg: "Out of stock" });
    }
    item.quantity += 1;
    await item.save();
  } else {
    if (product.stock < 1) {
      return res.status(400).json({ msg: "Out of stock" });
    }
    item = await Cart.create({ product: productId, quantity: 1 });
  }

  res.json(item);
});

// DECREASE
router.put("/decrease/:id", async (req, res) => {
  const item = await Cart.findById(req.params.id);

  if (!item) return res.status(404).json({ msg: "Not found" });

  if (item.quantity > 1) {
    item.quantity -= 1;
    await item.save();
  } else {
    await Cart.findByIdAndDelete(req.params.id);
  }

  res.json({ msg: "Updated" });
});

// GET CART
router.get("/", async (req, res) => {
  const cart = await Cart.find().populate("product");
  res.json(cart);
});

// REMOVE ITEM
router.delete("/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ msg: "Removed" });
});

module.exports = router;

