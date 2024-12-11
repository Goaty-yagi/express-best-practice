import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { ClientError } from "../errors";

const requestValidater = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      const err = new ClientError(error.details[0].message);
      next(err);
      return;
    }

    // Overwrite req.body with the validated and sanitized value
    req.body = value;
    next();
  };
};

export const schema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export default requestValidater;
