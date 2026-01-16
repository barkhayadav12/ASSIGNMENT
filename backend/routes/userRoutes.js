const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  const user = await User.findOne();
  res.json(user);
});

module.exports = router;
