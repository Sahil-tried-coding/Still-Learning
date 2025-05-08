import {  integer, json , pgTable, serial, varchar } from "drizzle-orm/pg-core";
// import { numeric } from "drizzle-orm/sqlite-core";

export const CourseList = pgTable("CourseList",{
    id:serial('id').primaryKey(),
    courseId:varchar('courseId').notNull(),
    name:varchar("courseName").notNull(),
    category:varchar("category").notNull(),
    level:varchar("level").notNull(),
    includeVideo:varchar("includeVideo").notNull().default("Yes"),
    courseOutput:json("courseOutput").notNull(),
    createdBy:varchar("createdBy").notNull(),
    userName:varchar("userName"),
    courseImage:varchar("courseImage"),
    userImage:varchar("userImage")
})


export const ChapterList = pgTable("ChapterList",{
    id:serial('id').primaryKey(),
    videoId:varchar("videoId").notNull(),
    courseId:varchar("courseId").notNull(),
    content:json('content').notNull(),
    chapterId:integer('chapterId').notNull(),
})