/*
  Warnings:

  - A unique constraint covering the columns `[assignmentName]` on the table `Assignments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Assignments_assignmentName_key" ON "Assignments"("assignmentName");
