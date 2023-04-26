import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User.entity";
import { Request } from "../entities/types";

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { userId: string };
    console.log("decodedToken:", decodedToken);
    const userId = decodedToken.userId;
    const user = await User.findOne(userId);
    console.log("user:", user);

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = user;
    const isAuthenticated = true;
    console.log("isAuthenticated:", isAuthenticated);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
    return;
  }
}
