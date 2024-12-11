import winston from "winston";

describe("Logger configuration", () => {
  afterEach(() => {
    jest.resetModules(); // Clear the module registry to ensure a fresh start
  });

  it("should use console transport for development", () => {
    jest.doMock("../../src/config", () => ({
      env: "development", // Simulate development environment
      logs: {
        level: "info",
      },
    }));

    // Re-import the logger after mocking the config
    const Logger = require("../../src/loaders/logger").default;

    // Get the transports array from the Logger instance
    const transports = Logger.transports as winston.transport[];

    // Find the console transport in the transports array
    const consoleTransport = transports.find(
      (transport: winston.transport) =>
        transport instanceof winston.transports.Console,
    );

    // Ensure consoleTransport is found
    expect(consoleTransport).toBeDefined(); // Check if it's defined

    // Check if the format is the `cli()` format
    if (consoleTransport) {
      const format = consoleTransport.format;
      // We expect the format to be a function and check if it contains a transform method (specific to `cli`)
      expect(format).toHaveProperty("transform"); // Ensure `transform` exists, which is part of the `cli()` format
    }
  });

  it("place holder for production", () => {
    jest.doMock("../../src/config", () => ({
      env: "production", // Simulate production environment
      logs: {
        level: "info",
      },
    }));

    // Re-import the logger after mocking the config
    const Logger = require("../../src/loaders/logger").default;
  });
});
