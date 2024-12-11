import BaseApiError from "./baseApi";

export default class AuthenticationError extends BaseApiError {
  constructor(message: string, details = []) {
    super({
      statusCode: 401,
      error: "AuthenticationError",
      message,
      details,
    });
  }
}
