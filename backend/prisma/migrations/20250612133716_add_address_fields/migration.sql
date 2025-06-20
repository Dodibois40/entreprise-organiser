-- AlterTable
ALTER TABLE "affaires" ADD COLUMN     "codePostal" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "pays" TEXT,
ADD COLUMN     "rue" TEXT,
ADD COLUMN     "ville" TEXT;
