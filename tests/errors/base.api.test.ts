import { BaseApiError } from "../../src/errors";
import { BaseApiErrorClassProps, DetailsType } from "../../src/types/errors";

// Create a subclass for testing to expose the protected constructor
class TestError extends BaseApiError {
  constructor(props: BaseApiErrorClassProps) {
    super(props); // Call the protected constructor
  }
}

describe("BaseApiError", () => {
  const errorProps: BaseApiErrorClassProps = {
    statusCode: 400,
    error: "TestError",
    message: "The request is invalid",
    details: [
      { field: "username", error: "Username is required" },
    ] as DetailsType[],
  };

  it("should correctly instantiate and set properties", () => {
    const error = new TestError(errorProps); // Use the subclass to instantiate

    expect(error.statusCode).toBe(400);
    expect(error.error).toBe("TestError");
    expect(error.message).toBe("TestError: The request is invalid");
    expect(error.details).toEqual([
      { field: "username", error: "Username is required" },
    ]);
    expect(error.name).toBe("TestError"); // Name should be the subclass name
  });

  it("should set an empty details array when no details are provided", () => {
    const errorPropsWithoutDetails: BaseApiErrorClassProps = {
      statusCode: 404,
      error: "Not Found",
      message: "The resource was not found",
    };

    const error = new TestError(errorPropsWithoutDetails);

    expect(error.details).toEqual([]);
  });

  it("should clear the stack trace in production", () => {
    process.env.NODE_ENV = "production"; // Simulate production environment

    const error = new TestError(errorProps);

    expect(error.stack).toBe(""); // Stack trace should be cleared in production
  });

  it("should retain stack trace in non-production environment", () => {
    process.env.NODE_ENV = "development"; // Simulate non-production environment

    const error = new TestError(errorProps);

    expect(error.stack).toBeDefined(); // Stack trace should exist in non-production environments
  });

  it("should serialize to JSON correctly", () => {
    const error = new TestError(errorProps);

    const json = error.toJSON();

    expect(json).toEqual({
      statusCode: 400,
      error: "TestError",
      message: "TestError: The request is invalid",
      details: [{ field: "username", error: "Username is required" }],
      stack: expect.any(String), // Expecting a string stack trace in non-production, empty in production
    });
  });
});
