const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const Booking = require("../models/Booking");

const router = express.Router();

// Create a new booking
router.post("/create", verifyToken, async (req, res) => {
  const { movieName, theaterName, showTime, seats, totalPrice } = req.body;

  if (
    !movieName ||
    !theaterName ||
    !showTime ||
    !seats ||
    seats.length === 0 ||
    !totalPrice
  ) {
    return res
      .status(400)
      .json({ message: "All booking details are required" });
  }

  try {
    const newBooking = new Booking({
      user: req.user.id,
      movieName,
      theaterName,
      showTime,
      seats,
      totalPrice,
    });

    const savedBooking = await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking successful", booking: savedBooking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Get all bookings for the logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({
      bookingDate: -1,
    });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Cancel a booking
router.delete("/cancel/:id", verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to cancel this booking" });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking canceled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

module.exports = router;
