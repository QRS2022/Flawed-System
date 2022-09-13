/*
  Warnings:

  - The primary key for the `BlueClickCount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `clickId` was added to the `BlueClickCount` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `enterTick` to the `BlueClickCount` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BlueClickCount_widget_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BlueClickCount" (
    "clickId" TEXT NOT NULL PRIMARY KEY,
    "enterTick" TEXT NOT NULL,
    "widget" TEXT NOT NULL,
    "count" INTEGER NOT NULL
);
INSERT INTO "new_BlueClickCount" ("count", "widget") SELECT "count", "widget" FROM "BlueClickCount";
DROP TABLE "BlueClickCount";
ALTER TABLE "new_BlueClickCount" RENAME TO "BlueClickCount";
CREATE UNIQUE INDEX "BlueClickCount_clickId_key" ON "BlueClickCount"("clickId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
