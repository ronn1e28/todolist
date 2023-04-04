const Joi = require("joi");
const ValidationException = require("../../../exceptions/ValidationException");
import { Request, Response, NextFunction } from "express";

function createTodoRequestValidate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // create schema object

  const schema = Joi.object({
    content: Joi.string().min(3).required(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    throw new ValidationException(error.message);
    // throw new Error({message: error.message})
  } else {
    // on success replace req.body with validated value and trigger next middleware function
    req.body = value;
    next();
  }
}

module.exports = createTodoRequestValidate;
