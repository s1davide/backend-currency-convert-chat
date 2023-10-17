import cors from "cors";
import express,{ Express } from "express";

import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
  origin: [process.env.FRONTEND_URL as string],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const initializeConfig = (app: Express) => {
  app.use(cors(corsOptions));
  app.use(express.raw());
  app.use(express.json());
};
