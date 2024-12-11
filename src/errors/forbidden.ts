import BaseApiError from "./baseApi";

export default class ForbiddenError extends BaseApiError {
  constructor(message: string, details = []) {
    super({
      statusCode: 403,
      error: "ForbiddenError",
      message,
      details,
    });
  }
}
