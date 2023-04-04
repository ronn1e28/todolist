import HttpException from "./HttpException";
class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, 404);
  }
}

module.exports = NotFoundException;
