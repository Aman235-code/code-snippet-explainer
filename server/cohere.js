const axios = require("axios");
require("dotenv").config();

async function summarizeCode(code) {
  const prompt = `Explain this code in simple terms:\n\n${code}`;

  const response = await axios.post(
    "https://api.cohere.ai/v1/generate",
    {
      model: "command",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.6,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.generations[0].text.trim();
}

module.exports = { summarizeCode };
