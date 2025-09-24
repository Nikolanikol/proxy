const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // если Node < 18

const app = express();
app.use(cors()); // разрешаем CORS для фронта

const PORT = process.env.PORT || 7001;
app.get("/", (req, res) => {
  res.send("Proxy server is running");
});
app.get("/proxy", async (req, res) => {
  try {
    const requestUrl = req.query.url;
    const response = await fetch(requestUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
