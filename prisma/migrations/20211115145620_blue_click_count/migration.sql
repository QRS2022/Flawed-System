-- CreateTable
CREATE TABLE "BlueClickCount" (
    "widget" TEXT NOT NULL PRIMARY KEY,
    "count" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BlueClickCount_widget_key" ON "BlueClickCount"("widget");
