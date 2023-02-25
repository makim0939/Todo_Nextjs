/*
  Warnings:

  - You are about to drop the column `discription` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT;
