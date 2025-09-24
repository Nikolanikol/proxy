const express = require("express");

const app = express();
const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
  console.log(`Proxy  server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.get("/proxy", async (req, res) => {
  try {
    const requestUrl = req.query.url;
    console.log(requestUrl);
    const response = await fetch(requestUrl);
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
