import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User.entity";
import { Session } from "express-session";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    req.body = user;
    next();
  });
}

// Define a new interface that extends the Request interface with a session property
interface AuthenticatedRequest extends Request {
  ssession: Session & { uesrId?: number };
  user: User;
}

export default AuthenticatedRequest;
