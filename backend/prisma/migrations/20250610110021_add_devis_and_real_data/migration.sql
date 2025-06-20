-- CreateEnum
CREATE TYPE "StatutDevis" AS ENUM ('EN_ATTENTE_VALIDATION', 'VALIDE', 'REFUSE', 'EXPIRE');

-- CreateEnum
CREATE TYPE "StatutBdc" AS ENUM ('EN_ATTENTE', 'VALIDE', 'RECEPTIONNE', 'ANNULE');

-- AlterTable
ALTER TABLE "affaires" ADD COLUMN     "achatReelHt" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "caReelHt" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "heuresReellesFab" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "heuresReellesPose" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "heuresReellesSer" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "bdc" ADD COLUMN     "statut" "StatutBdc" NOT NULL DEFAULT 'EN_ATTENTE';

-- CreateTable
CREATE TABLE "devis" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "montantHt" DOUBLE PRECISION NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateValidite" TIMESTAMP(3) NOT NULL,
    "statut" "StatutDevis" NOT NULL DEFAULT 'EN_ATTENTE_VALIDATION',
    "description" TEXT,
    "commentaire" TEXT,
    "affaireId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "devis_numero_key" ON "devis"("numero");

-- AddForeignKey
ALTER TABLE "devis" ADD CONSTRAINT "devis_affaireId_fkey" FOREIGN KEY ("affaireId") REFERENCES "affaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
