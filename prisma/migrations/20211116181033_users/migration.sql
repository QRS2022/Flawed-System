/*
  Warnings:

  - Added the required column `position` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Messages" (
    "messageId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deliverName" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    CONSTRAINT "Messages_deliverName_fkey" FOREIGN KEY ("deliverName") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Courses" (
    "courseName" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Assignments" (
    "assignmentName" TEXT NOT NULL,
    "assignmentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "visibleRange" TEXT NOT NULL,
    "theCourseName" TEXT NOT NULL,
    CONSTRAINT "Assignments_theCourseName_fkey" FOREIGN KEY ("theCourseName") REFERENCES "Courses" ("courseName") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Courseware" (
    "coursewareName" TEXT NOT NULL,
    "coursewareId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "theCourseName" TEXT NOT NULL,
    CONSTRAINT "Courseware_theCourseName_fkey" FOREIGN KEY ("theCourseName") REFERENCES "Courses" ("courseName") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "coursesCourseName" TEXT,
    CONSTRAINT "User_coursesCourseName_fkey" FOREIGN KEY ("coursesCourseName") REFERENCES "Courses" ("courseName") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "name", "password", "username") SELECT "email", "name", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Messages_messageId_key" ON "Messages"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "Courses_courseName_key" ON "Courses"("courseName");

-- CreateIndex
CREATE UNIQUE INDEX "Assignments_assignmentName_key" ON "Assignments"("assignmentName");
