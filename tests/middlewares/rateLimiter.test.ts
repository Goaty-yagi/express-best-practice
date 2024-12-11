import express, { ErrorRequestHandler } from "express";
import rateLimit from "express-rate-limit";
import request from "supertest";

import config from "../../src/config";
import errorHandler from "../../src/middlewares/errorHandler";
import limiter from "../../src/middlewares/rateLimiting";

jest.mock("../../src/loaders/logger", () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}));

jest.mock("../../src/config", () => ({
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2, // Limit each IP to 2 request per windowMs
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
}));

describe("Rate Limiting Middleware", () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(limiter); // Attach rate limiter middleware
    app.get("/test", (req, res) => {
      res.status(200).send("Success");
    });
  });

  it("should allow requests under the rate limit", async () => {
    const response1 = await request(app).get("/test");
    expect(response1.status).toBe(200);
    expect(response1.text).toBe("Success");

    const response2 = await request(app).get("/test");
    expect(response2.status).toBe(200);
    expect(response2.text).toBe("Success");
  });

  it("should block requests over the rate limit", async () => {
    await request(app).get("/test"); // 1st request
    await request(app).get("/test"); // 2nd request
    app.use(errorHandler as ErrorRequestHandler);
    const response3 = await request(app).get("/test"); // 3rd request, should be blocked
    expect(response3.status).toBe(429);
    expect(response3.body.message).toEqual(
      "TooManyRequestsError: Too many requests from this IP, please try again after 15 minutes",
    );
  });
});
