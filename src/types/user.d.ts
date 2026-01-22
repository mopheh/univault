import { z } from "zod";
import { createUserSchema } from "#validations/user.validation.ts";

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type UserRole = "STUDENT" | "ADMIN" | "FACULTY REP";

export interface AuthUser {
  id?: string;
  clerkId: string;
  email: string;
  role?: UserRole | null;
  created_at?: Date | null;
}
