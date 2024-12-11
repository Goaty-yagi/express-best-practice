import { rateLimit } from "express-rate-limit";

import config from "../config";
import TooManyRequestsError from "../errors/tooManyRequests";

const limiter = rateLimit({
  ...config.rateLimit,
  handler: (req, res, next) => {
    const err = new TooManyRequestsError(config.rateLimit.message);
    next(err);
  },
});

export default limiter;
