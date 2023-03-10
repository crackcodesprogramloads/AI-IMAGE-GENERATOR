import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(configuration);

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/dream", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const image = aiResponse.data;
    res.send({ image });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong");
  }
});

app.listen(3000, () =>
  console.log("make art on https://transcendent-melba-6ea4a3.netlify.app/dream")
);
