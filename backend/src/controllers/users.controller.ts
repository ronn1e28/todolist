const UserService = require("../services/users.service");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { Request, Response, NextFunction } from "express";

class userController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user) {
        const userObj = {
          email: req.user.email,
          aud: req.user.aud,
          auth_time: req.user.auth_time,
          user_id: req.user.user_id,
          issued_at: req.user.iat,
          expires: req.user.exp,
          picture: req.user.picture,
          email_Verified: req.user.email_verified
            ? req.user.email_verified.toString()
            : "false",
        };
        await UserService.store(userObj);
        return res.status(200).json({ message: "Success" });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "Error Storing User to Backend Server",
      });
    }
  }
}

const userControllerObj = new userController();

export default userControllerObj;
