import express, { ErrorRequestHandler, Request, Response } from "express";
import request from "supertest";

import errorHandler from "../../src/middlewares/errorHandler";
import requestValidator, { schema } from "../../src/middlewares/validation";

jest.mock("../../src/loaders/logger", () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}));

describe("requestValidator Middleware", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json()); // To parse JSON bodies

    app.post(
      "/test",
      requestValidator(schema),
      (req: Request, res: Response) => {
        res.status(200).json({
          statusCode: 200,
          message: "Validation passed",
          data: req.body,
        });
      },
    );
    app.use(errorHandler as ErrorRequestHandler);
  });

  it("should validate and pass valid requests", async () => {
    // Add the middleware to validate the request body
    const response = await request(app).post("/test").send({
      username: "test",
      email: "test@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Validation passed");
  });

  it("should return 400 for missing email", async () => {
    // Add the middleware to validate the request body
    app.post(
      "/login",
      requestValidator(schema),
      (req: Request, res: Response) => {
        res.status(200).json({
          statusCode: 200,
          message: "Validation passed",
          data: req.body,
        });
      },
    );
    app.use(errorHandler as ErrorRequestHandler);

    // Make an invalid request (missing email)
    const response = await request(app).post("/login").send({
      username: "test",
      password: "password123",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain('ClientError: "email" is required');
  });

  it("should return 400 for invalid email format", async () => {
    // Add the middleware to validate the request body
    app.post(
      "/login",
      requestValidator(schema),
      (req: Request, res: Response) => {
        res.status(200).json({
          statusCode: 200,
          message: "Validation passed",
          data: req.body,
        });
      },
    );
    app.use(errorHandler as ErrorRequestHandler);

    // Make an invalid request (invalid email format)
    const response = await request(app).post("/login").send({
      username: "test",
      email: "invalid-email",
      password: "password123",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain('"email" must be a valid email');
  });

  it("should return 400 for password too short", async () => {
    // Add the middleware to validate the request body
    app.post(
      "/login",
      requestValidator(schema),
      (req: Request, res: Response) => {
        res.status(200).json({
          statusCode: 200,
          message: "Validation passed",
          data: req.body,
        });
      },
    );
    app.use(errorHandler as ErrorRequestHandler);

    // Make an invalid request (password too short)
    const response = await request(app).post("/login").send({
      username: "test",
      email: "test@example.com",
      password: "short",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain(
      '"password" length must be at least 8 characters long',
    );
  });
});
