import logger from "#config/logger.ts";
import { createUser } from "#services/user.service.ts";
import { AuthenticatedRequest } from "#types/types.js";
import { formatValidationError } from "#utils/format.js";
import { createUserSchema } from "#validations/user.validation.ts";
import { Response, NextFunction } from "express";

export const addUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // clerkAuth middleware MUST run before this
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const validation = createUserSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: formatValidationError(validation.error),
      });
    }

    const {
      email,
      fullName,
      facultyId,
      departmentId,
      year,
      phoneNumber,
      matricNo,
      gender,
      address,
    } = validation.data;

    const user = await createUser({
      clerkId: req.user.clerkId,
      email,
      fullName,
      facultyId,
      departmentId,
      year,
      phoneNumber,
      matricNo,
      gender,
      address,
    });

    logger.info(`User onboarded successfully: ${email}`);

    return res.status(201).json({
      message: "User onboarded successfully",
      user: {
        id: user.id,
        fullName: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: unknown) {
    logger.error("CreateUser error", error);

    if (error instanceof Error) {
      if (error.message === "User with this email already exists") {
        return res.status(409).json({ error: "Email already exists" });
      }
    }

    return next(error);
  }
};
