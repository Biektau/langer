/*
  Warnings:

  - Added the required column `userId` to the `Dictionary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dictionary" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Dictionary" ADD CONSTRAINT "Dictionary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
