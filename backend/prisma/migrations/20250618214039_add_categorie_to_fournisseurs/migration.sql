-- CreateEnum
CREATE TYPE "CategorieFournisseur" AS ENUM ('QUINCAILLERIE', 'BOIS', 'VITRAGE', 'MENUISERIE', 'AGENCEMENT', 'FERRONNERIE', 'PEINTURE', 'ELECTRICITE', 'PLOMBERIE', 'ISOLATION', 'OUTILLAGE', 'AUTRE');

-- AlterTable
ALTER TABLE "fournisseurs" ADD COLUMN     "categorie" "CategorieFournisseur";
