import type { GoogleUser, JwtUser } from "./types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser | GoogleUser;
    }
  }
}

export {};
