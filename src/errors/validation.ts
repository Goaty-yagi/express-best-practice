import BaseApiError from "./baseApi";

export default class ValidationError extends BaseApiError {
  constructor(message: string, details = []) {
    super({
      statusCode: 422,
      error: "ValidationError",
      message,
      details,
    });
  }
}
