import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ message: "Unauthorized" });

    const token = header.split(" ")[1];
    const payload = verifyToken(token) as any;

    if (!payload?.id) return res.status(401).json({ message: "Unauthorized" });

    const user = await db.query.users.findFirst({ where: eq(users.id, payload.id) });

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = { id: user.id, role: user.role };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default requireAuth;
