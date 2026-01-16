const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

// ADD TO WISHLIST
router.post("/", async (req, res) => {
  const { productId } = req.body;

  const exists = await Wishlist.findOne({ product: productId });
  if (exists) return res.json({ message: "Already wishlisted" });

  const item = await Wishlist.create({ product: productId });
  res.json(item);
});

// GET WISHLIST
router.get("/", async (req, res) => {
  const items = await Wishlist.find().populate("product");
  res.json(items);
});

// REMOVE FROM WISHLIST
router.delete("/:id", async (req, res) => {
  await Wishlist.findByIdAndDelete(req.params.id);
  res.json({ message: "Removed" });
});

module.exports = router;
