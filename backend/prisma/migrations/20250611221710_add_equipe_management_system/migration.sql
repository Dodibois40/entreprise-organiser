-- CreateEnum
CREATE TYPE "TypePhase" AS ENUM ('FABRICATION', 'POSE', 'SERVICE', 'LIVRAISON', 'SAV');

-- CreateEnum
CREATE TYPE "StatutPhase" AS ENUM ('PLANIFIEE', 'EN_COURS', 'TERMINEE', 'ANNULEE');

-- CreateEnum
CREATE TYPE "StatutTache" AS ENUM ('ASSIGNEE', 'EN_COURS', 'TERMINEE', 'EN_PAUSE', 'ANNULEE');

-- AlterTable
ALTER TABLE "pointages" ADD COLUMN     "coutCalcule" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "tacheId" TEXT;

-- CreateTable
CREATE TABLE "phases_chantier" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "typePhase" "TypePhase" NOT NULL,
    "statut" "StatutPhase" NOT NULL DEFAULT 'PLANIFIEE',
    "dateDebutPrevue" TIMESTAMP(3),
    "dateFinPrevue" TIMESTAMP(3),
    "dateDebutReelle" TIMESTAMP(3),
    "dateFinReelle" TIMESTAMP(3),
    "tempsEstimeH" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "coutEstime" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tempsReelH" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "coutReel" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ordre" INTEGER NOT NULL DEFAULT 1,
    "affaireId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "phases_chantier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taches_affectation" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "statut" "StatutTache" NOT NULL DEFAULT 'ASSIGNEE',
    "dateAffectation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateDebutPrevue" TIMESTAMP(3),
    "dateFinPrevue" TIMESTAMP(3),
    "dateDebutReelle" TIMESTAMP(3),
    "dateFinReelle" TIMESTAMP(3),
    "tempsEstimeH" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "coutEstime" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tempsReelH" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "coutReel" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "phaseId" TEXT NOT NULL,
    "ouvrierAffecteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "taches_affectation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pointages" ADD CONSTRAINT "pointages_tacheId_fkey" FOREIGN KEY ("tacheId") REFERENCES "taches_affectation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phases_chantier" ADD CONSTRAINT "phases_chantier_affaireId_fkey" FOREIGN KEY ("affaireId") REFERENCES "affaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taches_affectation" ADD CONSTRAINT "taches_affectation_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "phases_chantier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taches_affectation" ADD CONSTRAINT "taches_affectation_ouvrierAffecteId_fkey" FOREIGN KEY ("ouvrierAffecteId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
