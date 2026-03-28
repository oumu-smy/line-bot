const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const ACCESS_TOKEN = h4SkDvpv3oPdxVthLM/Ohh1EZZzPThRlRdMK/ViQCGjRAzaG6HF1eh86EqR0LZ5JwrefvwsbInB5u/pL9mPylHF08fBZliJvjekoCXst0fHTP/jOiomGdyuxpfV/PG/eI0KihWme1oAxn7SeVpWuFAdB04t89/1O/w1cDnyilFU=;

app.post("/webhook", async (req, res) => {
  const events = req.body.events;

  for (const event of events) {
    if (event.type === "message") {
      const replyToken = event.replyToken;
      const userMessage = event.message.text;

      await axios.post(
        "https://api.line.me/v2/bot/message/reply",
        {
          replyToken: replyToken,
          messages: [{ type: "text", text: userMessage }]
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`
          }
        }
      );
    }
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
