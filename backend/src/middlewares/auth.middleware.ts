import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateRole = (allowedRoles: string[]) => {
  const middlware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: string;
        role: string;
      };

      if (!allowedRoles.includes(decoded.role)) {
        res.status(403).json({ message: "Forbidden" });
      }

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };

  return middlware;
};
