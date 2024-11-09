import { NextFunction, Request, Response, Router } from "express";

// the error handler will only be invoked if it receives an error object through next(err).
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  const responseBody = {
    statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  };
  // logging here
  console.log("Error from handler:", responseBody);
  res.json(responseBody);
};

export default errorHandler;
