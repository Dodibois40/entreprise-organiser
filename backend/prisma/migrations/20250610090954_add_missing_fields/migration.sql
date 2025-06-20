-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RoleEnum" ADD VALUE 'DIRIGEANT';
ALTER TYPE "RoleEnum" ADD VALUE 'CHEF_CHANTIER';
ALTER TYPE "RoleEnum" ADD VALUE 'OUVRIER_CHANTIER';
ALTER TYPE "RoleEnum" ADD VALUE 'OUVRIER_ATELIER';
ALTER TYPE "RoleEnum" ADD VALUE 'SOUS_TRAITANT';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "dateEmbauche" TIMESTAMP(3),
ADD COLUMN     "tarifHoraireBase" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "telephone" TEXT;
