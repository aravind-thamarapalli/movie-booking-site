const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", verifyToken, async (req, res) => {
  const user = req.user;
  res.json({ user });
});

module.exports = router;
