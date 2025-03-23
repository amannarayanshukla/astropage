const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
  },
  description: {
    type: String,
    required: [true, "Please add a review description"],
  },
  userName: {
    type: String,
    required: [true, "Please add user name"],
  },
  image: {
    type: String,
  },
  company: {
    type: String,
    required: [true, "Please add company name"],
  },
  designation: {
    type: String,
    required: [true, "Please add designation"],
  },
  logo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
