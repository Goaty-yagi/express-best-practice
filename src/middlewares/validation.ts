import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const requestValidater = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      res.status(400).json({
        error: error.details[0].message,
      });
    }

    // Overwrite req.body with the validated and sanitized value
    req.body = value;
    next();
  };
};

export const schema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
});

export default requestValidater