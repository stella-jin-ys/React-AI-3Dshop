import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from routes" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    if (res.status === 200) {
      const image = response.data.data[0].b64_json;
      res.status(200).json({ photo: image });
    } else {
      const errorMessage = res.data?.error?.message || "Server error";
      const statusCode = res.status || 500;
      res.status(statusCode).json({ message: errorMessage });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
