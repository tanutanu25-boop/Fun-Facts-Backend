import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

app.get("/fun-fact", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Give me one interesting random fun fact. Keep it short."
    });

    res.json({
      fact: response.text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate fun fact"
    });
  }
});

app.post("/fun-fact", async (req, res) => {
  try {
    const topic = req.body.topic;

    if (!topic) {
      return res.status(400).json({
        error: "Please enter a topic"
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Give me one interesting fun fact about ${topic}. Keep it short.`
    });

    res.json({
      fact: response.text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate fun fact"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});