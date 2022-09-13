/*
  Warnings:

  - Added the required column `teacherName` to the `Courses` table without a default value. This is not possible if the table is not empty.

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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
