import BaseApiError from "./baseApi";

export default class ServerError extends BaseApiError {
  constructor(message: string, details = []) {
    super({
      statusCode: 500,
      error: "ServerError",
      message,
      details,
    });
  }
}
