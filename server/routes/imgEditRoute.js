import * as dotenv from "dotenv";
import express from "express";
import fs from "fs";
import multer from "multer";
import { Configuration, OpenAIApi } from "openai";
import sharp from "sharp";

dotenv.config();
const router = express.Router();

/**============================================
 *               open ai config
 *=============================================**/
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**============================================
 *               multer
 *=============================================**/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

/**============================================
 *               router - route
 *=============================================**/
router.route("/").get((req, res) => {
  res.send("Expect Image?");
});

router.route("/").post(uploads.single("file"), async (req, res) => {
  // ? ------------ img resize ----------------
  let inputFile = `${req.file.originalname}`;
  let outputFile = "";

  if (req.file.mimetype === "image/png") {
    outputFile = "ai-" + inputFile;
  } else {
    outputFile = inputFile.substring(0, inputFile.indexOf(".")) + ".png";
  }
  
  const getImg = () => {
    inputFile &&
      sharp(`./uploads/${inputFile}`)
        .resize({ height: 512, width: 512 })
        .toFile(`./uploads/${outputFile}`)
        .then(async () => {
          await generateImage();
          fs.unlink(`./uploads/${inputFile}`, () => {
            console.log("input file cleared");
          });
          fs.unlink(`./uploads/${outputFile}`, () => {
            console.log("output file cleared");
          });
        })
        .catch((err) => {
          res.status(400).send({ success: false, error: err.message });
        });
  };
  getImg();

  //? -------------- Image generate from open AI -----------------
  const generateImage = async () => {
    try {
      let response = await openai.createImageVariation(
        fs.createReadStream(`./uploads/${outputFile}`),
        1,
        "512x512",
        "b64_json"
      );
      res
        .status(201)
        .send({ success: true, data: response.data.data[0].b64_json });
    } catch (err) {
      res.status(400).send({ success: false, error: err.message });
    }
  };
});
export default router;
