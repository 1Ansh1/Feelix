const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log("Analyze route hit");
  console.log("Body:", req.body);

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  const sentiment = text.toLowerCase().includes("bad")
    ? "NEGATIVE"
    : "POSITIVE";

  res.json({ sentiment });
});

module.exports = router;
