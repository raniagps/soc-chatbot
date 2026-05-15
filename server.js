const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "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",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(5000, () => console.log("Proxy demarre sur http://localhost:5000"));
