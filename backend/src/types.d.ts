import { Request } from "express";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

interface Error extends Error {
  status?: number;
  message?: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: DecodedIdToken;
    }
  }
}

export interface RequestWithUser extends Request {
    user: DecodedIdToken
}