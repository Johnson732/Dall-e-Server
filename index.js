const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());
console.log("backend1");
let url = "https://api.openai.com/v1/images/generations";
let token = "";
app.post("/api", async (req, res) => {
  console.log("backend2");
  const prompt = req.body.prompt;
  try {
    const response = await axios.post(
      url,
      {
        prompt: prompt,
        model: "dall-e-3",
        n: 1,
        size: "1024x1024",
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("backend3");
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.response.data);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server listening to the port ", port);
});
