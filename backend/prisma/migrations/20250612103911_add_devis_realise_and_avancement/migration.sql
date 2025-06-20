-- AlterEnum
ALTER TYPE "StatutDevis" ADD VALUE 'REALISE';

-- AlterTable
ALTER TABLE "affaires" ADD COLUMN     "avancementPourcentage" DOUBLE PRECISION NOT NULL DEFAULT 0;
