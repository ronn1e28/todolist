import HttpException from "./HttpException";

class ValidationException extends HttpException {
  constructor(message: string) {
    super(message, 400);
  }
}

module.exports = ValidationException;
