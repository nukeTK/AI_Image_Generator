import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

export default router;