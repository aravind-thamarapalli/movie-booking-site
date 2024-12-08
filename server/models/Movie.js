const mongoose = require("mongoose");

// Step 1: Create the schema for the movie details
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    director: {
      type: String,
      required: true,
      trim: true,
    },
    posImage: {
      type: String,
      required: true,
    },
    bgImage: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number, // Duration in minutes
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    cinema: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

// Step 2: Create the model
const Movie = mongoose.model("Movie", movieSchema);

// Step 3: Export the model
module.exports = Movie;
