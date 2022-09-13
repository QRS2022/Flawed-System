/*
  Warnings:

  - You are about to drop the `_CoursesToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `theCourseName` on the `Courseware` table. All the data in the column will be lost.
  - You are about to drop the column `theCourseName` on the `Assignments` table. All the data in the column will be lost.
  - Added the required column `courseName` to the `Courseware` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseName` to the `Assignments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_CoursesToUser_B_index";

-- DropIndex
DROP INDEX "_CoursesToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CoursesToUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Courseware" (
    "coursewareName" TEXT NOT NULL,
    "coursewareId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseName" TEXT NOT NULL
);
INSERT INTO "new_Courseware" ("coursewareId", "coursewareName") SELECT "coursewareId", "coursewareName" FROM "Courseware";
DROP TABLE "Courseware";
ALTER TABLE "new_Courseware" RENAME TO "Courseware";
CREATE TABLE "new_Assignments" (
    "assignmentName" TEXT NOT NULL,
    "assignmentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "visibleRange" TEXT NOT NULL,
    "courseName" TEXT NOT NULL
);
INSERT INTO "new_Assignments" ("assignmentId", "assignmentName", "visibleRange") SELECT "assignmentId", "assignmentName", "visibleRange" FROM "Assignments";
DROP TABLE "Assignments";
ALTER TABLE "new_Assignments" RENAME TO "Assignments";
CREATE UNIQUE INDEX "Assignments_assignmentName_key" ON "Assignments"("assignmentName");
CREATE TABLE "new_Messages" (
    "messageId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deliverName" TEXT NOT NULL,
    "message" TEXT NOT NULL
);
INSERT INTO "new_Messages" ("deliverName", "message", "messageId") SELECT "deliverName", "message", "messageId" FROM "Messages";
DROP TABLE "Messages";
ALTER TABLE "new_Messages" RENAME TO "Messages";
CREATE UNIQUE INDEX "Messages_messageId_key" ON "Messages"("messageId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
