import { z } from "zod";

export const createUserSchema = z.object({
  clerkId: z.string().trim().min(1).max(255),

  email: z.email().max(255).toLowerCase().trim(),

  fullName: z.string().min(2).max(255).trim(),

  facultyId: z.uuid(),
  departmentId: z.uuid(),

  year: z.enum(["100", "200", "300", "400", "500", "600"]).default("100"),

  phoneNumber: z.string().regex(/^\+?[0-9]{7,15}$/, "Invalid phone number"),

  matricNo: z.string().min(2).max(255).trim(),

  gender: z.enum(["MALE", "FEMALE"]),

  address: z.string().min(2).max(255).trim(),
});
