const express = require("express");
const { summarizeCode } = require("../cohere");

const router = express.Router();

// Only POST route, no saving to file
router.post("/add", async (req, res) => {
  try {
    const { snippet } = req.body;

    if (!snippet) {
      return res.status(400).json({ error: "Snippet is required" });
    }

    const summary = await summarizeCode(snippet);

    const result = {
      snippet,
      summary,
    };

    res.status(200).json({ message: "Summary generated", result });
  } catch (err) {
    console.error("❌ Failed to generate summary:", err);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

module.exports = router;
