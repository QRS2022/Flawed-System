/*
  Warnings:

  - You are about to drop the column `deliverName` on the `Messages` table. All the data in the column will be lost.
  - Added the required column `courseName` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerName` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Messages" (
    "messageId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerName" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    CONSTRAINT "Messages_ownerName_fkey" FOREIGN KEY ("ownerName") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Messages" ("message", "messageId") SELECT "message", "messageId" FROM "Messages";
DROP TABLE "Messages";
ALTER TABLE "new_Messages" RENAME TO "Messages";
CREATE UNIQUE INDEX "Messages_messageId_key" ON "Messages"("messageId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
