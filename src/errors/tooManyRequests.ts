import BaseApiError from "./baseApi";

export default class TooManyRequestsError extends BaseApiError {
  constructor(message: string, details = []) {
    super({
      statusCode: 429,
      error: "TooManyRequestsError",
      message,
      details,
    });
  }
}
