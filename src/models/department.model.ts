import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { courses } from "./course.model.ts";

export const faculty = pgTable("faculty", {
  id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const departments = pgTable("department", {
  id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  facultyId: uuid("faculty_id")
    .notNull()
    .references(() => faculty.id, { onDelete: "cascade" }),
});
export const departmentCourses = pgTable("department_courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  departmentId: uuid("department_id")
    .notNull()
    .references(() => departments.id, { onDelete: "cascade" }),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
});
