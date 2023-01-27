import * as dotenv from "dotenv";
import express from "express";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.send("Expect Image??");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResposnse = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
      response_format: 'b64_json'
    });
    const image = await aiResposnse.data.data[0].b64_json;
    // console.log("🚀 ~ router.route ~ aiResposnse", image)

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log("🚀 ~ router.route ~ error occured in 37th line");
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
