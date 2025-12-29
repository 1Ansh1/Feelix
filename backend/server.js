const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Feedback = require("./models/feedback");

const app = express();
app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// ✅ Analyze route
app.post("/api/analyze", async (req, res) => {
  try {
    console.log("POST /api/analyze hit");
    console.log("Body:", req.body);

    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const axios = require("axios");

    const hfResponse = await axios.post(
      "https://router.huggingface.co/hf-inference/models/distilbert/distilbert-base-uncased-finetuned-sst-2-english",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const hfData = hfResponse.data;

    // Handle both possible formats
    const prediction = Array.isArray(hfData[0]) ? hfData[0][0] : hfData[0];

    const sentiment = prediction.label;
    const confidence = prediction.score;

    // ✅ Save to MongoDB
    await Feedback.create({ text, sentiment, confidence });

    res.json({
      sentiment,
      confidence,
    });
  } catch (err) {
    console.error("Analyze error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Analytics graph modification in server.js
const analyticsRoutes = require("./routes/analyticsRoutes");
app.use("/api/analytics", analyticsRoutes);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
