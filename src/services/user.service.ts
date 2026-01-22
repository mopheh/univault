import { db } from "#config/database.ts";
import logger from "#config/logger.ts";
import { users } from "#models/user.model.ts";
import { eq } from "drizzle-orm";
import { CreateUserInput } from "../types/user";

export const createUser = async ({
  clerkId,
  email,
  fullName,
  facultyId,
  departmentId,
  year,
  phoneNumber,
  matricNo,
  gender,
  address,
}: CreateUserInput) => {
  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const [newUser] = await db
      .insert(users)
      .values({
        clerkId,
        email,
        fullName,
        facultyId,
        departmentId,
        year,
        phoneNumber,
        matricNo,
        gender,
        address,
      })
      .returning({
        id: users.id,
        name: users.fullName,
        email: users.email,
        role: users.role,
        created_at: users.createdAt,
      });
    if (!newUser) {
      throw new Error("User creation failed");
    }

    logger.info(`User ${newUser.email} created successfully`);
    return newUser;
  } catch (error) {
    logger.error("CreateUser", error);
    throw error;
  }
};
