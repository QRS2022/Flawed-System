/*
  Warnings:

  - You are about to drop the column `coursesCourseName` on the `User` table. All the data in the column will be lost.

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
CREATE TABLE "new_User" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "position" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "name", "password", "position", "username") SELECT "email", "name", "password", "position", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesToUser_AB_unique" ON "_CoursesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesToUser_B_index" ON "_CoursesToUser"("B");
