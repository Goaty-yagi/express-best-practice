import cors from "cors";
import express, { ErrorRequestHandler } from "express";
import helmet from "helmet";
import { NotFoundError } from "../errors";
import config from "../config";
import errorHandler from "../middlewares/errorHandler";
import limiter from "../middlewares/rateLimiting";
import routes from "../routes";
import swagger from "./swagger";

export default ({ app }: { app: express.Application }) => {
  // parse request data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // security
  app.use(helmet(config.security.helmet));
  app.use(cors(config.security.cors));
  app.use(limiter);

  // swagger for development
  if (config.env !== "production") {
    app.use("/api-docs", ...swagger());
  }

  // routes
  app.use(config.api.prefix, routes());

  // don’t match any of the defined routes.
  app.use((req, res, next) => {
    const err = new NotFoundError("Not Found");
    next(err);
  });

  // Error handler should be at the last
  app.use(errorHandler as ErrorRequestHandler);
};
