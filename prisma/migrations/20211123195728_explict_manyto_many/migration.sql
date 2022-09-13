/*
  Warnings:

  - You are about to drop the `_CoursesToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CoursesToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "StudentsOnCourses" (
    "username" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,

    PRIMARY KEY ("username", "courseName"),
    CONSTRAINT "StudentsOnCourses_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentsOnCourses_courseName_fkey" FOREIGN KEY ("courseName") REFERENCES "Courses" ("courseName") ON DELETE RESTRICT ON UPDATE CASCADE
);
