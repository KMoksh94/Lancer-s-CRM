const express = require("express");
const User = require("../database-connection/user-model");
const router = express.Router();

router.get("/call", async (req, res) => {
  try {
    const users = await User.find();
    const userCount = users.length;
    return res.status(200).json({ msg: `Service Working!`, userCount });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
