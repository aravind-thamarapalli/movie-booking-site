const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { verifyRole } = require("../middleware/roleMiddleware");
const User = require("../models/User");

const router = express.Router();

router.delete(
  "/delete-user/:id",
  verifyToken,
  verifyRole("admin"),
  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  }
);

module.exports = router;
