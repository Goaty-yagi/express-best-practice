import express, { NextFunction, Request, Response } from "express";
import request from "supertest";

import { ClientError, NotFoundError } from "../../src/errors";
import Logger from "../../src/loaders/logger";
import errorHandler from "../../src/middlewares/errorHandler";

jest.mock("../../src/loaders/logger", () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}));

const getErrorResponse = async (
  error: Error,
  route: string = "/some-route",
) => {
  const app = express();

  // Define a route that will trigger the provided error
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(error); // Pass the error to the error handler
  });

  // Attach the error handler middleware
  app.use(errorHandler as any);

  // Make the request and return the response
  return request(app).get(route);
};

describe("Error Handler Middleware", () => {
  it("should return a JSON response with status 400 for ClientError", async () => {
    const error = new ClientError("Test error");
    const response = await getErrorResponse(error);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("statusCode", 400);
    expect(response.body).toHaveProperty("message", "ClientError: Test error");
    expect(response.body).toHaveProperty("stack");
  });

  it("should log the error message", async () => {
    const error = new Error("Test error");
    const nextFunction = jest.fn();

    const req: Request = {} as Request;
    const res: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      statusCode: 500,
    } as any;

    // Call the errorHandler manually (to simulate error handling)
    errorHandler(error, req, res, nextFunction);

    // Check if the logger was called with the error message
    expect(Logger.error).toHaveBeenCalledWith(error.message);
  });

  it("should return a blank stack trace in production", async () => {
    process.env.NODE_ENV = "production"; // Set environment to production
    const response = await getErrorResponse(new Error("Test error"));

    expect(response.body.stack).toBe(""); // Stack trace should be empty in production
  });

  it("should return a stack trace in non-production environments", async () => {
    process.env.NODE_ENV = "development"; // Set environment to development

    const response = await getErrorResponse(new Error("Test error"));

    expect(response.body.stack).not.toBe(""); // Stack trace should not be empty in development
  });

  it("should return a 500 status and error message when error is not an instance of BaseApiError", async () => {
    const error = new Error("Test error");
    const response = await getErrorResponse(error);

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("ServerError");
    expect(response.body.message).toBe(
      "ServerError: Error is not instance of BaseApiError",
    );
    expect(response.body.details).toEqual([]);
    expect(response.body.stack).toBeDefined();
  });
});
