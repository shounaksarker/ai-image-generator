import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import dalleRoutes from "./routes/dalleRoutes.js";
import imgEditRoute from "./routes/imgEditRoute.js";
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/imgEdit", imgEditRoute);

app.get("/", async (req, res) => {
  res.send("Wrong API called");
});

const port = process.env.PORT || 8080;
const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log("Server has started on port localhost:8080");
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();