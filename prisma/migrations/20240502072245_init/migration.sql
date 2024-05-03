/*
  Warnings:

  - You are about to drop the column `city` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `device` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `loginSource` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "device",
DROP COLUMN "loginSource";
