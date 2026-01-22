import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { Request, Response, NextFunction } from "express";
import { db } from "#config/database.ts";
import { users } from "#models/user.model.ts";
import { eq } from "drizzle-orm";

const client = jwksClient({
  jwksUri: process.env.CLERK_JWKS_URL!,
});

const getKey = (header: any, callback: any) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
};

export const clerkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token!!!" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, getKey, {}, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = {
      clerkId: decoded.sub,
      email: decoded.email,
    };

    next();
  });
};

export const requiredRole =
  (allowedRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, req.user!.clerkId))
      .limit(1);

    if (!allowedRole.includes(user[0].role!)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
