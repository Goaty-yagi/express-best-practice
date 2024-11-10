import express from "express";
import helmet from "helmet";
import cors from "cors";
import limiter from "../middlewares/rateLimiting";
import errorHandler from "../middlewares/errorHandler";
import routes from "../routes";
import config from "../config";

export default ({ app }: { app: express.Application }) => {
  // parse request data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // security
  app.use(helmet(config.security.helmet));
  app.use(cors(config.security.cors));
  app.use(limiter);

  // routes
  app.use(config.api.prefix, routes());

  // don’t match any of the defined routes.
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    res.statusCode = 404
    next(err);
  });

  // Error handler should be at the last
  app.use(errorHandler);
};
