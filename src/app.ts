import 'dotenv/config';
import errorHandler from "./middlewares/errorHandler";
import requestValidater from "./middlewares/validation";
import { schema } from "./middlewares/validation";
import helmet from "helmet";
import cors from "cors";
import config from "./config";
import limiter from './middlewares/rateLimiting';
import express, { Request, Response, NextFunction } from "express";
const app = express();
const port = process.env.PORT || 3000;


// parse reuest data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// security
app.use(helmet(config.security.helmet))
app.use(cors(config.security.cors))
app.use(limiter)

app.get("/", (req: Request, res: Response, next:NextFunction) => {
  res.send("Hello, World!");
});
app.get("/error", (req: Request, res: Response, next:NextFunction) => {
  // trigger errorhandler
  const error = new Error("Something went wrong");
  next(error)
});

// Test rateLimiting
app.post("/validation", requestValidater(schema), (req: Request, res: Response) => {
  res.json("User data is valid!");
});

// Error handler should locate at the last
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
