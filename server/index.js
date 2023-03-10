import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectdb from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import bodyparser from "body-parser";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" })); 

/* app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());   */

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Server is running");
});

const startServer = async () => {
  try {
    connectdb(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log("Server has started");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
