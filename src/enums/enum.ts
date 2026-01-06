import { pgEnum } from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("role", ["STUDENT", "ADMIN", "FACULTY REP"]);
export const SEMESTER_ENUM = pgEnum("semester", ["FIRST", "SECOND"]);
export const GENDER_ENUM = pgEnum("gender", ["MALE", "FEMALE"]);
export const LEVEL_ENUM = pgEnum("level", [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
]);
