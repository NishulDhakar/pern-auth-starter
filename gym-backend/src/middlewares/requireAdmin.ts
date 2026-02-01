import { Request, Response, NextFunction } from "express";

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const anyReq = req as any;

  if (!anyReq.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (anyReq.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};

export default requireAdmin;
