const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    text: String,
    sentiment: String,
    confidence: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
