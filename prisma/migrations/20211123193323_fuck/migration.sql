/*
  Warnings:

  - You are about to drop the column `courseName` on the `Courseware` table. All the data in the column will be lost.
  - You are about to drop the column `courseName` on the `Assignments` table. All the data in the column will be lost.
  - You are about to drop the column `teacherName` on the `Courses` table. All the data in the column will be lost.
  - Added the required column `theCourseName` to the `Courseware` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theCourseName` to the `Assignments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "_CoursesToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Courses" ("courseName") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("username") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Courseware" (
    "coursewareName" TEXT NOT NULL,
    "coursewareId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "theCourseName" TEXT NOT NULL,
    CONSTRAINT "Courseware_theCourseName_fkey" FOREIGN KEY ("theCourseName") REFERENCES "Courses" ("courseName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Courseware" ("coursewareId", "coursewareName") SELECT "coursewareId", "coursewareName" FROM "Courseware";
DROP TABLE "Courseware";
ALTER TABLE "new_Courseware" RENAME TO "Courseware";
CREATE TABLE "new_Messages" (
    "messageId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deliverName" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    CONSTRAINT "Messages_deliverName_fkey" FOREIGN KEY ("deliverName") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Messages" ("deliverName", "message", "messageId") SELECT "deliverName", "message", "messageId" FROM "Messages";
DROP TABLE "Messages";
ALTER TABLE "new_Messages" RENAME TO "Messages";
CREATE UNIQUE INDEX "Messages_messageId_key" ON "Messages"("messageId");
CREATE TABLE "new_Assignments" (
    "assignmentName" TEXT NOT NULL,
    "assignmentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "visibleRange" TEXT NOT NULL,
    "theCourseName" TEXT NOT NULL,
    CONSTRAINT "Assignments_theCourseName_fkey" FOREIGN KEY ("theCourseName") REFERENCES "Courses" ("courseName") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Assignments" ("assignmentId", "assignmentName", "visibleRange") SELECT "assignmentId", "assignmentName", "visibleRange" FROM "Assignments";
DROP TABLE "Assignments";
ALTER TABLE "new_Assignments" RENAME TO "Assignments";
CREATE UNIQUE INDEX "Assignments_assignmentName_key" ON "Assignments"("assignmentName");
CREATE TABLE "new_Courses" (
    "courseName" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Courses" ("courseName") SELECT "courseName" FROM "Courses";
DROP TABLE "Courses";
ALTER TABLE "new_Courses" RENAME TO "Courses";
CREATE UNIQUE INDEX "Courses_courseName_key" ON "Courses"("courseName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesToUser_AB_unique" ON "_CoursesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesToUser_B_index" ON "_CoursesToUser"("B");
