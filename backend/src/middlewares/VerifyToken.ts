// const auth = require("../config/firebase-config.js");
import auth from "../config/firebase-config";
import { Request, Response, NextFunction } from "express";

const VerifyToken = async (req: Request, res: Response, next: NextFunction) => {
  let token = "";
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    const decodeValue = await auth.verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      return next();
    }
  } catch (e) {
    if (e instanceof Error) {
      return res.json({ message: e.message });
    }
  }
};

export default VerifyToken;
