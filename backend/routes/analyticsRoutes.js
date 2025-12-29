const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");

router.get("/summary", async (req, res) => {
  try {
    const total = await Feedback.countDocuments();

    const sentiments = await Feedback.aggregate([
      {
        $group: {
          _id: "$sentiment",
          count: { $sum: 1 },
          avgConfidence: { $avg: "$confidence" },
        },
      },
    ]);

    const recent = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("text sentiment confidence createdAt");

    res.json({
      total,
      sentiments,
      recent,
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

module.exports = router;
