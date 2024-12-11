import { BaseApiErrorClassProps, DetailsType } from "../types/errors";

export default class BaseApiError extends Error {
  statusCode: number;
  error: string;
  details: DetailsType[];

  protected constructor({
    statusCode,
    error,
    message,
    details = [],
  }: BaseApiErrorClassProps) {
    super(`${error}: ${message}`);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.error = error;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);

    if (process.env.NODE_ENV !== "production") {
      Error.captureStackTrace(this, this.constructor); // Captures stack trace
    } else {
      this.stack = ""; // Explicitly clear the stack in production
    }
  }
  toJSON() {
    return {
      statusCode: this.statusCode,
      error: this.error,
      message: this.message,
      details: this.details,
      stack: this.stack,
    };
  }
}
