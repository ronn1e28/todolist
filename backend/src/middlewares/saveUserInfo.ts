import { PrismaClient, User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();

const store = async (data: User) => {
  const user = await prisma.user.findUnique({
    where: {
      user_id: data.user_id,
    },
  });

  if (!user) {
    await prisma.user.create({ data }).catch((err) => {
      console.log(err);
    });
  }
};

const saveUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userObj: User = {
      email: req.user.email || "",
      aud: req.user.aud,
      auth_time: req.user.auth_time,
      user_id: req.user.user_id,
      issued_at: req.user.iat,
      expires: req.user.exp,
      email_Verified: req.user.email_verified
        ? req.user.email_verified.toString()
        : "false",
    };
    await store(userObj);
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = saveUserInfo;
