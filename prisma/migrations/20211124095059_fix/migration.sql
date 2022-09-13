-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignments" (
    "assignmentName" TEXT NOT NULL,
    "assignmentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "visibleRange" TEXT NOT NULL DEFAULT 'Public',
    "theCourseName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    CONSTRAINT "Assignments_theCourseName_fkey" FOREIGN KEY ("theCourseName") REFERENCES "Courses" ("courseName") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Assignments_ownerName_fkey" FOREIGN KEY ("ownerName") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Assignments" ("assignmentId", "assignmentName", "ownerName", "theCourseName", "visibleRange") SELECT "assignmentId", "assignmentName", "ownerName", "theCourseName", "visibleRange" FROM "Assignments";
DROP TABLE "Assignments";
ALTER TABLE "new_Assignments" RENAME TO "Assignments";
CREATE UNIQUE INDEX "Assignments_assignmentName_key" ON "Assignments"("assignmentName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
