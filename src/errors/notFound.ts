import BaseApiError from "./baseApi";

export default class NotFoundError extends BaseApiError {
  constructor(message: string, details = []) {
    super({
      statusCode: 404,
      error: "NotFoundError",
      message,
      details,
    });
  }
}
