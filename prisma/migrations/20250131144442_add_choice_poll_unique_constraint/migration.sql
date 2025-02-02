/*
  Warnings:

  - A unique constraint covering the columns `[optionText,pollId]` on the table `Choice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Choice_optionText_pollId_key" ON "Choice"("optionText", "pollId");
