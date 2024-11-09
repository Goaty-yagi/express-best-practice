import { rateLimit } from "express-rate-limit";
import config from "../config";

const limiter = rateLimit(config.rateLimit);
export default limiter