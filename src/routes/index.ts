import express from "express";
import requestValidater from "../middlewares/validation";
import { schema } from "../middlewares/validation";
import Logger from '../loaders/logger';

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, World!");
});

router.get("/error", (req, res, next) => {
  const error = new Error("Something went wrong");
  Logger.error('ERROR')
  next(error);
});

// Test rateLimiting
router.post("/validation", requestValidater(schema), (req, res) => {
  res.json("User data is valid!");
});

export default () => router;
