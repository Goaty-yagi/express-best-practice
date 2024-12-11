import { DetailsType } from "../types/errors";
import BaseApiError from "./baseApi";

export default class ClientError extends BaseApiError {
  constructor(message: string, details: DetailsType[] = []) {
    super({
      statusCode: 400,
      error: "ClientError",
      message,
      details,
    });
  }
}
