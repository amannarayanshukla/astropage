const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: [
    {
      type: String,
      required: true,
    },
  ],
  tagLines: [String],
  price: {
    type: Number,
    required: [true, "Please add price"],
    min: [0, "Price cannot be negative"],
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Session", sessionSchema);
