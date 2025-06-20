/*
  Warnings:

  - You are about to drop the column `heuresReellesSer` on the `affaires` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "affaires" DROP COLUMN "heuresReellesSer",
ADD COLUMN     "objectifFraisGeneraux" DOUBLE PRECISION NOT NULL DEFAULT 0;
