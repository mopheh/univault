import {
  integer,
  pgTable,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { parseStatusEnum, users } from "./user.model.ts";
import { departments } from "./department.model.ts";
import { courses } from "./course.model.ts";

export const books = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  type: varchar("type", { length: 255 }).notNull().default("Material"),
  departmentId: uuid("department_id")
    .notNull()
    .references(() => departments.id, { onDelete: "cascade" }),
  parseStatus: parseStatusEnum("parse_status").default("pending"),
  fileUrl: varchar("file_url", { length: 1000 }),

  pageCount: integer("page_count"),
  postedBy: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
export const bookCourses = pgTable("book_courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookId: uuid("book_id")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
});

export const bookPages = pgTable(
  "book_pages",
  {
    id: uuid("id").primaryKey().unique().defaultRandom(),
    bookId: uuid("book_id")
      .notNull()
      .references(() => books.id, { onDelete: "cascade" }),

    pageNumber: integer("page_number").notNull(),
    textChunk: varchar("text_chunk"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    uniq: unique().on(t.bookId, t.pageNumber),
  })
);
