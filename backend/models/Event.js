const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  description: [
    {
      type: String,
      required: [true, "Please add description paragraphs"],
    },
  ],
  tagLines: [String],
  image: {
    type: String,
  },
  eventDate: {
    type: Date,
    required: [true, "Please add event date"],
  },
  price: {
    type: Number,
    required: [true, "Please add price"],
    min: [0, "Price cannot be negative"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
