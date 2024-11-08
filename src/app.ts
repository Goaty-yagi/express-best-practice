import { config } from "dotenv";
import errorHandler from "./middlewares/errorHandler";
import express, { Request, Response, NextFunction } from "express";

config();
const app = express();
const port = process.env.PORT || 3000;


// Use body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response, next:NextFunction) => {
  res.send("Hello, World!");
});
app.get("/error", (req: Request, res: Response, next:NextFunction) => {
  // trigger errorhandler
  const error = new Error("Something went wrong");
  next(error)
});

// Error handler should locate at the last
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
