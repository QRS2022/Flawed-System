/*
  Warnings:

  - Added the required column `assignmentName` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Messages" (
    "messageId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerName" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "assignmentName" TEXT NOT NULL,
    CONSTRAINT "Messages_ownerName_fkey" FOREIGN KEY ("ownerName") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Messages" ("courseName", "message", "messageId", "ownerName") SELECT "courseName", "message", "messageId", "ownerName" FROM "Messages";
DROP TABLE "Messages";
ALTER TABLE "new_Messages" RENAME TO "Messages";
CREATE UNIQUE INDEX "Messages_messageId_key" ON "Messages"("messageId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
