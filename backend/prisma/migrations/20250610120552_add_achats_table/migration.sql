-- CreateEnum
CREATE TYPE "StatutAchat" AS ENUM ('RECU', 'VALIDE', 'PAYE', 'LITIGE');

-- CreateTable
CREATE TABLE "achats" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "numeroFacture" TEXT NOT NULL,
    "montantHt" DOUBLE PRECISION NOT NULL,
    "montantTtc" DOUBLE PRECISION NOT NULL,
    "dateFacture" TIMESTAMP(3) NOT NULL,
    "dateReception" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "datePaiement" TIMESTAMP(3),
    "statut" "StatutAchat" NOT NULL DEFAULT 'RECU',
    "commentaire" TEXT,
    "affaireId" TEXT NOT NULL,
    "categorieId" TEXT NOT NULL,
    "fournisseur" TEXT NOT NULL,
    "bdcId" TEXT,
    "montantFg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "achats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "achats_numero_key" ON "achats"("numero");

-- AddForeignKey
ALTER TABLE "achats" ADD CONSTRAINT "achats_affaireId_fkey" FOREIGN KEY ("affaireId") REFERENCES "affaires"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achats" ADD CONSTRAINT "achats_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "categories_achat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achats" ADD CONSTRAINT "achats_bdcId_fkey" FOREIGN KEY ("bdcId") REFERENCES "bdc"("id") ON DELETE SET NULL ON UPDATE CASCADE;
