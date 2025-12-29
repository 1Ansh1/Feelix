const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("audio", fs.createReadStream(req.file.path));

    const response = await axios.post(
      "http://localhost:8000/transcribe",
      formData,
      { headers: formData.getHeaders() }
    );

    fs.unlinkSync(req.file.path);

    res.json(response.data);
  } catch (error) {
    console.error("Python ASR error:", error.message);
    res.status(500).json({ error: "ASR failed" });
  }
});

module.exports = router;
