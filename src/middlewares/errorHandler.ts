import { NextFunction, Request, Response } from "express";

import { BaseApiError, ServerError } from "../errors";
import Logger from "../loaders/logger";

// the error handler will only be invoked if it receives an error object through next(err).
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (!(err instanceof BaseApiError)) {
    const errorResponse = new ServerError(
      `${err.name} is not instance of BaseApiError`,
    );

    res.status(500);
    Logger.error(err.message);
    return res.json(errorResponse);
  }

  const statusCode = err.statusCode;

  res.status(statusCode);
  Logger.error(err.message);
  res.json(err);
};

export default errorHandler;
