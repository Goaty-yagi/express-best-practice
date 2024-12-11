describe("Config", () => {
  // Test for missing .env file (should throw an error)
  it("should throw an error if .env file is not found", () => {
    // Mock dotenv.config() to simulate error when .env is missing
    jest.doMock("dotenv", () => ({
      config: jest.fn().mockReturnValue({ error: true }),
    }));

    // Require config.js to trigger dotenv.config()
    const requireConfig = () => require("../../src/config");

    // Test that the error is thrown
    expect(requireConfig).toThrow("Couldn't find .env file");
  });

  // Test for default NODE_ENV value
  it('should use "development" as default NODE_ENV if not defined', () => {
    // Reset the module to ensure a clean state
    jest.resetModules();
    // Mock dotenv.config() to simulate success (no error)
    jest.doMock("dotenv", () => ({
      config: jest.fn().mockReturnValue({ error: false }),
    }));

    // Make sure to delete environment variables before each test
    delete process.env.NODE_ENV;

    // Require config.js to trigger dotenv.config()
    const config = require("../../src/config");

    // Test the default value for NODE_ENV
    expect(config.default.env).toBe("development");
  });

  // Test for default PORT value
  it("should use 3000 as default port if not defined", () => {
    // Reset the module to ensure a clean state
    jest.resetModules();
    // Mock dotenv.config() to simulate success (no error)
    jest.doMock("dotenv", () => ({
      config: jest.fn().mockReturnValue({ error: false }),
    }));

    // Delete process.env.PORT to simulate it's not defined
    delete process.env.PORT;

    // Require config.js to trigger dotenv.config()
    const config = require("../../src/config");

    // Test the default value for PORT
    expect(config.default.port).toBe(3000);
  });
});

describe("CORS configuration", () => {
  // Test when CORS_WHITELIST is not defined (empty)
  it("should allow all origins if CORS_WHITELIST is empty", () => {
    // Remove CORS_WHITELIST from the environment to simulate it being empty
    delete process.env.CORS_WHITELIST;

    // Require the config file to get the updated configuration
    const config = require("../../src/config");

    // Create a mock callback to test the CORS behavior
    const callback = jest.fn();

    // Call the origin check with a test origin and ensure it passes
    config.default.security.cors.origin("http://example.com", callback);

    // Assert that the origin is allowed by calling the callback with 'null' and 'true'
    expect(callback).toHaveBeenCalledWith(null, true);
  });

  // Test when CORS_WHITELIST is set with a specific origin
  it("should allow whitelisted origins", () => {
    // Set the CORS_WHITELIST environment variable to a specific URL
    process.env.CORS_WHITELIST = "http://example.com";

    // Require the config file again to get the updated configuration
    const config = require("../../src/config");

    // Create a mock callback to test the CORS behavior
    const callback = jest.fn();

    // Call the origin check with the whitelisted origin and ensure it passes
    config.default.security.cors.origin("http://example.com", callback);

    // Assert that the origin is allowed by calling the callback with 'null' and 'true'
    expect(callback).toHaveBeenCalledWith(null, true);
  });

  // Test when a non-whitelisted origin is passed
  it("should deny non-whitelisted origins", () => {
    // Set the CORS_WHITELIST environment variable to a specific URL
    process.env.CORS_WHITELIST = "http://example.com";

    // Require the config file again to get the updated configuration
    const config = require("../../src/config");

    // Create a mock callback to test the CORS behavior
    const callback = jest.fn();

    // Call the origin check with a non-whitelisted origin and expect it to be denied
    config.default.security.cors.origin("http://notallowed.com", callback);

    // Assert that the origin is denied by calling the callback with an error
    expect(callback).toHaveBeenCalledWith(new Error("Not allowed by CORS"));
  });
});

describe("Rate Limit Configuration", () => {
  it("should have default rate limit settings", () => {
    const config = require("../../src/config");
    expect(config.default.rateLimit.windowMs).toBe(15 * 60 * 1000); // 15 minutes
    expect(config.default.rateLimit.max).toBe(100);
    expect(config.default.rateLimit.message).toBe(
      "Too many requests from this IP, please try again after 15 minutes",
    );
  });
});
