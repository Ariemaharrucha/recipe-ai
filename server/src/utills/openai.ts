import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
export const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  })
