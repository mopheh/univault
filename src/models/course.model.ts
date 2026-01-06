import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { departments } from "./department.model.ts";
import { LEVEL_ENUM, SEMESTER_ENUM } from "../enums/enum.ts";

export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
  courseCode: varchar("course_code", { length: 255 }).notNull().unique(),
  unitLoad: integer("unit_load").notNull(),
  level: LEVEL_ENUM("level").notNull(),
  semester: SEMESTER_ENUM("semester").default("FIRST"),
  title: varchar("title").notNull(),
  departmentId: uuid("department_id")
    .notNull()
    .references(() => departments.id, { onDelete: "cascade" }),
});
