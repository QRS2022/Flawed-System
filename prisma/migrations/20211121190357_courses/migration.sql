/*
  Warnings:

  - Added the required column `teacherName` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Courses" (
    "courseName" TEXT NOT NULL PRIMARY KEY,
    "teacherName" TEXT NOT NULL
);
INSERT INTO "new_Courses" ("courseName") SELECT "courseName" FROM "Courses";
DROP TABLE "Courses";
ALTER TABLE "new_Courses" RENAME TO "Courses";
CREATE UNIQUE INDEX "Courses_courseName_key" ON "Courses"("courseName");
CREATE TABLE "new_User" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "position" TEXT NOT NULL DEFAULT 'student'
);
INSERT INTO "new_User" ("email", "password", "position", "username") SELECT "email", "password", coalesce("position", 'student') AS "position", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
