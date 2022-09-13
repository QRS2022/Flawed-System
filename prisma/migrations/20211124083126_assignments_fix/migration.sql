/*
  Warnings:

  - Added the required column `ownerName` to the `Assignments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignments" (
    "assignmentName" TEXT NOT NULL,
    "assignmentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "visibleRange" TEXT NOT NULL,
    "theCourseName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    CONSTRAINT "Assignments_theCourseName_fkey" FOREIGN KEY ("theCourseName") REFERENCES "Courses" ("courseName") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Assignments_ownerName_fkey" FOREIGN KEY ("ownerName") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Assignments" ("assignmentId", "assignmentName", "theCourseName", "visibleRange") SELECT "assignmentId", "assignmentName", "theCourseName", "visibleRange" FROM "Assignments";
DROP TABLE "Assignments";
ALTER TABLE "new_Assignments" RENAME TO "Assignments";
CREATE UNIQUE INDEX "Assignments_assignmentName_key" ON "Assignments"("assignmentName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
