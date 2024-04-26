const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
//console.log("backend1");
let imageUrl = "https://api.openai.com/v1/images/generations";
let chatUrl ="https://api.openai.com/v1/chat/completions";
let token = process.env.TOKEN;
app.post("/api", async (req, res) => {
  //console.log("backend2");
  const prompt = req.body.prompt;
  try {
    const response = await axios.post(
      imageUrl,
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
        },timeout: 10000,
      }
    );
    //console.log("backend3");
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.response.data);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/chat", async (req, res) => {
  //console.log("backend2,");
  const prompt = `can you list a 10 different prompts for this given prompt to generate an image "${req.body.prompt}"`;
  try {
    const response = await axios.post(
      chatUrl,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //console.log("backend3,");
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server listening to the port ", port);
});
