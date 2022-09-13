-- CreateTable
CREATE TABLE "OperationSequence" (
    "operationId" TEXT NOT NULL PRIMARY KEY,
    "page" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "widget" TEXT NOT NULL,
    "startTimeTick" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "OperationSequence_operationId_key" ON "OperationSequence"("operationId");
