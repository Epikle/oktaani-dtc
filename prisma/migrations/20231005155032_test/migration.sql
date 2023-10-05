/*
  Warnings:

  - A unique constraint covering the columns `[codeTitle]` on the table `Dtc` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dtc_codeTitle_key" ON "Dtc"("codeTitle");
