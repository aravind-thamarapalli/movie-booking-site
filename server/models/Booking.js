const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movieName: { type: String, required: true },
  theaterName: { type: String, required: true },
  showTime: { type: Date, required: true },
  seats: { type: [String], required: true }, // Array of seat numbers
  totalPrice: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
